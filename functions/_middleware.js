const COOKIE_NAME = "__Host-pbv_guest";
const LOGIN_PATH = "/_guest-login";
const LOGOUT_PATH = "/_guest-logout";
const DEFAULT_SESSION_SECONDS = 7 * 24 * 60 * 60;
const encoder = new TextEncoder();

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeNext(value) {
  if (!value || typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return "/";
  try {
    const url = new URL(value, "https://guest.invalid");
    if (url.origin !== "https://guest.invalid") return "/";
    if (url.pathname === LOGIN_PATH || url.pathname === LOGOUT_PATH) return "/";
    return url.pathname + url.search + url.hash;
  } catch {
    return "/";
  }
}

function loginHtml(nextPath, invalid = false) {
  const next = escapeHtml(safeNext(nextPath));
  const error = invalid
    ? '<p class="error" role="alert">Codice non corretto · Incorrect code · Falscher Code</p>'
    : "";
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>Piccolabellavista · Accesso ospiti</title>
<style>
:root{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#12304a;background:#f4f8fb}
*{box-sizing:border-box}
body{min-height:100vh;margin:0;display:grid;place-items:center;padding:24px}
main{width:min(100%,420px);background:#fff;border:1px solid #d9e4ec;border-radius:18px;padding:28px;box-shadow:0 18px 48px rgba(18,48,74,.12)}
h1{font-size:1.55rem;margin:0 0 10px}p{line-height:1.45}
label{display:block;font-weight:700;margin:22px 0 8px}
input{width:100%;font:inherit;padding:14px;border:1px solid #9db3c5;border-radius:10px}
button{width:100%;margin-top:14px;padding:14px;border:0;border-radius:10px;background:#123f63;color:#fff;font:inherit;font-weight:700;cursor:pointer}
small{display:block;margin-top:18px;color:#536b7c;line-height:1.4}.error{color:#9b1c1c;font-weight:700}
</style>
</head>
<body>
<main>
<h1>Piccolabellavista</h1>
<p>Inserisci il codice ricevuto dall'host.<br>Enter the code provided by your host.<br>Geben Sie den Code Ihres Gastgebers ein.</p>
${error}
<form method="post" action="${LOGIN_PATH}" autocomplete="off">
<input type="hidden" name="next" value="${next}">
<label for="guest-code">Codice ospite · Guest code · Gästecode</label>
<input id="guest-code" name="code" type="password" inputmode="numeric" autocomplete="one-time-code" required autofocus>
<button type="submit">Entra · Enter · Öffnen</button>
</form>
<small>La guida è riservata agli ospiti autorizzati. Il codice non viene memorizzato nel browser.</small>
</main>
</body>
</html>`;
}

function pageResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"
    }
  });
}

function getCookie(cookieHeader, name) {
  if (!cookieHeader) return "";
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return "";
}

function bytesToHex(bytes) {
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex) {
  if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

async function digest(value) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

function equalBytes(a, b) {
  if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array) || a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a[i] ^ b[i];
  return mismatch === 0;
}

async function pinMatches(submitted, expected) {
  const [a, b] = await Promise.all([digest(submitted), digest(expected)]);
  return equalBytes(a, b);
}

async function hmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function signSession(secret, ttlSeconds) {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const nonceBytes = new Uint8Array(16);
  crypto.getRandomValues(nonceBytes);
  const payload = `${exp}.${bytesToHex(nonceBytes)}`;
  const key = await hmacKey(secret);
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
  return `${payload}.${bytesToHex(signature)}`;
}

async function validSession(secret, token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) return false;
  const [expRaw, nonce, sigHex] = parts;
  if (!/^\d+$/.test(expRaw) || !/^[0-9a-f]{32}$/i.test(nonce)) return false;
  const exp = Number(expRaw);
  if (!Number.isSafeInteger(exp) || exp <= Math.floor(Date.now() / 1000)) return false;
  const signature = hexToBytes(sigHex);
  if (!signature) return false;
  const key = await hmacKey(secret);
  return crypto.subtle.verify("HMAC", key, signature, encoder.encode(`${expRaw}.${nonce}`));
}

function sessionSeconds(env) {
  const hours = Number(env.GUEST_SESSION_HOURS || 168);
  if (!Number.isFinite(hours) || hours <= 0 || hours > 720) return DEFAULT_SESSION_SECONDS;
  return Math.round(hours * 60 * 60);
}

function sessionCookie(token, maxAge) {
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

function clearCookie() {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

function redirect(location, status = 302, cookie = "") {
  const headers = new Headers({
    Location: location,
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow, noarchive"
  });
  if (cookie) headers.append("Set-Cookie", cookie);
  return new Response(null, { status, headers });
}

function isNavigation(request) {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  return request.headers.get("Sec-Fetch-Dest") === "document" ||
    (request.headers.get("Accept") || "").includes("text/html");
}

function configError() {
  return new Response("Guest access is not configured.", {
    status: 503,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" }
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.GUEST_PIN || !env.SESSION_SECRET || String(env.SESSION_SECRET).length < 24) return configError();

  const url = new URL(request.url);

  if (url.pathname === LOGIN_PATH) {
    const next = safeNext(url.searchParams.get("next") || "/");
    if (request.method === "GET" || request.method === "HEAD") return pageResponse(loginHtml(next));
    if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD, POST" } });

    let form;
    try {
      form = await request.formData();
    } catch {
      return pageResponse(loginHtml(next, true), 400);
    }
    const submitted = String(form.get("code") || "");
    const formNext = safeNext(String(form.get("next") || next));
    if (!submitted || !(await pinMatches(submitted, String(env.GUEST_PIN)))) {
      return pageResponse(loginHtml(formNext, true), 401);
    }

    const ttl = sessionSeconds(env);
    const token = await signSession(String(env.SESSION_SECRET), ttl);
    return redirect(formNext, 303, sessionCookie(token, ttl));
  }

  if (url.pathname === LOGOUT_PATH) {
    return redirect(LOGIN_PATH, 303, clearCookie());
  }

  const token = getCookie(request.headers.get("Cookie"), COOKIE_NAME);
  if (token && await validSession(String(env.SESSION_SECRET), token)) {
    const response = await context.next();
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-store");
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }

  if (isNavigation(request)) {
    const next = safeNext(url.pathname + url.search);
    return redirect(`${LOGIN_PATH}?next=${encodeURIComponent(next)}`);
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}
