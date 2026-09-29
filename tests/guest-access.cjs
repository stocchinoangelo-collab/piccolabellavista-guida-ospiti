const assert = require('node:assert/strict');
const fs = require('node:fs');
const { webcrypto, randomBytes, createHash } = require('node:crypto');
const { pathToFileURL } = require('node:url');

globalThis.crypto = webcrypto;
const code = randomBytes(18).toString('base64url');
const env = {
  GUEST_CODE_SHA256: createHash('sha256').update(code).digest('hex'),
  GUEST_SESSION_KEY: randomBytes(32).toString('hex'),
  GUEST_ACCESS_UNTIL: new Date(Date.now() + 86_400_000).toISOString(),
};
const source = fs.readFileSync(require('node:path').join(__dirname, '../functions/_middleware.js'), 'utf8');

(async () => {
  const { onRequest } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  let reachedAssets = 0;
  const request = (path, options = {}) => new Request('https://guide.example' + path, options);
  const run = (req, settings = env) => onRequest({
    request: req, env: settings,
    next: async () => { reachedAssets++; return new Response('PRIVATE ASSET'); },
  });
  assert.equal((await run(request('/'))).status, 200);
  for (const path of ['/js/app.js', '/css/style.css', '/images/photo.webp', '/sw.js', '/manifest.webmanifest']) {
    const denied = await run(request(path));
    assert.equal(denied.status, 401, path);
    assert.equal(denied.headers.get('cache-control'), 'private, no-store');
  }
  assert.equal(reachedAssets, 0);
  assert.equal((await run(request('/', { method: 'POST' }))).status, 401);
  assert.equal((await run(request('/__guest/login', { method: 'POST', body: new URLSearchParams({ code: 'wrong-code-12345678' }) }))).status, 401);
  const signedIn = await run(request('/__guest/login', { method: 'POST', body: new URLSearchParams({ code }) }));
  assert.equal(signedIn.status, 303);
  const cookie = signedIn.headers.get('set-cookie');
  assert.match(cookie, /HttpOnly; Secure; SameSite=Lax/);
  assert.equal(signedIn.headers.get('location'), '/');
  const authorized = await run(request('/images/photo.webp', { headers: { Cookie: cookie.split(';')[0] } }));
  assert.equal(await authorized.text(), 'PRIVATE ASSET');
  assert.equal(authorized.headers.get('cache-control'), 'private, no-store');
  assert.equal(reachedAssets, 1);
  const sessionCookie = cookie.split(';')[0];
  assert.equal((await run(request('/js/app.js', { headers: { Cookie: sessionCookie.slice(0, -1) + (sessionCookie.endsWith('X') ? 'Y' : 'X') } }))).status, 401);
  assert.equal((await run(request('/js/app.js', { headers: { Cookie: cookie.split(';')[0] } }), {
    ...env, GUEST_CODE_SHA256: createHash('sha256').update('new-code').digest('hex'),
  })).status, 401, 'Rotating the guest code revokes existing sessions');
  assert.equal((await run(request('/js/app.js', { headers: { Cookie: cookie.split(';')[0] } }), {
    ...env, GUEST_ACCESS_UNTIL: new Date(Date.now() - 1000).toISOString(),
  })).status, 503, 'Expired configuration fails closed');
  assert.equal((await run(request('/'), {})).status, 503, 'Missing secrets fail closed');
  assert.equal(reachedAssets, 1);
  console.log('PASS: guest login, all assets denied by default, signed session, tamper rejection, rotation, expiry, fail closed');
})().catch(error => { console.error(error); process.exitCode = 1; });
