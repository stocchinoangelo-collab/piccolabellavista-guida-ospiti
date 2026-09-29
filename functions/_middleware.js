// Guest admission runs at the edge, before every Pages asset. Never put a code in client JS.
const COOKIE = 'pbv_guest';
const encoder = new TextEncoder();
const loginPath = '/__guest/login';

function bytes(hex) {
  if (!/^[a-f0-9]{64}$/i.test(hex || '')) return null;
  return Uint8Array.from(hex.match(/../g), pair => parseInt(pair, 16));
}
function sameBytes(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i];
  return difference === 0;
}
async function digest(value) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
}
async function signature(key, value) {
  const signingKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', signingKey, encoder.encode(value)));
}
function base64url(array) {
  return btoa(String.fromCharCode(...array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function decodeBase64url(value) {
  if (!/^[a-zA-Z0-9_-]{43}$/.test(value || '')) return null;
  try { return Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)); }
  catch { return null; }
}
function configuration(env) {
  const codeHash = bytes(env.GUEST_CODE_SHA256);
  const signingKey = bytes(env.GUEST_SESSION_KEY);
  const until = Date.parse(env.GUEST_ACCESS_UNTIL || '');
  if (!codeHash || !signingKey || !Number.isFinite(until) || until <= Date.now()) return null;
  return { codeHash, signingKey, until };
}
function response(body, status = 200, extra = {}) {
  return new Response(body, { status, headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'",
    ...extra,
  } });
}
function login(error = '') {
  const notice = error ? '<p role="alert">Codice non valido o scaduto.</p>' : '';
  return response(`<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Accesso ospiti · Piccolabellavista</title><style>body{font:18px system-ui;color:#163e52;background:#f6f7f3;margin:0;padding:24px}main{max-width:440px;margin:12vh auto;background:white;padding:30px;border-radius:18px;box-shadow:0 8px 30px #163e5222}label,input,button{display:block;width:100%;box-sizing:border-box}input,button{font:inherit;padding:12px;margin:12px 0;border-radius:8px}button{background:#135777;color:white;border:0}p[role=alert]{color:#a03224}</style><main><h1>Piccolabellavista Ospiti</h1><p>Inserisci il codice ricevuto per il tuo soggiorno. Non serve un’email.</p>${notice}<form action="${loginPath}" method="post"><label for="code">Codice ospiti</label><input id="code" name="code" type="password" autocomplete="off" required maxlength="100"><button type="submit">Entra nella Guida</button></form></main></html>`, error ? 401 : 200);
}
async function validSession(request, config) {
  const raw = (request.headers.get('Cookie') || '').split(';').map(x => x.trim()).find(x => x.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  const match = /^(\d{13})\.([a-zA-Z0-9_-]{43})$/.exec(raw || '');
  if (!match) return false;
  const expiry = Number(match[1]);
  if (expiry <= Date.now() || expiry > config.until) return false;
  const actual = decodeBase64url(match[2]);
  const expected = await signature(config.signingKey, `${expiry}.${base64url(config.codeHash)}`);
  return sameBytes(actual, expected);
}

export async function onRequest(context) {
  const { request, env } = context;
  const config = configuration(env);
  if (!config) return response('<h1>Accesso ospiti non disponibile</h1>', 503);
  const url = new URL(request.url);
  if (url.pathname === loginPath && request.method === 'POST') {
    if (Number(request.headers.get('Content-Length')) > 4096) return response('Richiesta troppo grande', 413);
    let form;
    try { form = await request.formData(); } catch { return login(true); }
    const code = form.get('code');
    if (typeof code !== 'string' || code.length < 16 || code.length > 100 || !sameBytes(await digest(code), config.codeHash)) return login(true);
    const expiry = Math.min(Date.now() + 12 * 60 * 60 * 1000, config.until);
    const mac = base64url(await signature(config.signingKey, `${expiry}.${base64url(config.codeHash)}`));
    return response(null, 303, {
      Location: '/',
      'Set-Cookie': `${COOKIE}=${expiry}.${mac}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${Math.ceil((expiry - Date.now()) / 1000)}`,
    });
  }
  if (url.pathname === loginPath) return login();
  if (!await validSession(request, config)) {
    if (request.method === 'GET' && (url.pathname === '/' || url.pathname.endsWith('.html'))) return login();
    return response('Accesso richiesto', 401);
  }
  const originResponse = await context.next();
  const headers = new Headers(originResponse.headers);
  headers.set('Cache-Control', 'private, no-store');
  headers.set('Vary', 'Cookie');
  return new Response(originResponse.body, { status: originResponse.status, statusText: originResponse.statusText, headers });
}
