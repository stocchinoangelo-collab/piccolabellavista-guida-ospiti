// Run privately for each stay: node scripts/new-guest-code.cjs 2026-10-03T11:00:00+02:00
const { randomBytes, createHash } = require('node:crypto');
const until = process.argv[2];
if (!until || !/[+-]\d\d:\d\d$|Z$/.test(until) || !Number.isFinite(Date.parse(until)) || Date.parse(until) <= Date.now()) {
  console.error('Indica la partenza con fuso orario, per esempio 2026-10-03T11:00:00+02:00');
  process.exit(1);
}
const code = randomBytes(18).toString('base64url');
console.log('Comunica privatamente agli ospiti il codice:', code);
console.log('Imposta questi Secrets nel progetto Cloudflare Pages (Production):');
console.log('GUEST_CODE_SHA256=' + createHash('sha256').update(code).digest('hex'));
console.log('GUEST_SESSION_KEY=' + randomBytes(32).toString('hex'));
console.log('GUEST_ACCESS_UNTIL=' + new Date(until).toISOString());
console.log('Non salvare questo output nel repository o nel MASTER.');
