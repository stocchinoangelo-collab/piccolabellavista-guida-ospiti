const COOKIE_NAME = "pbv_guest";
const DEFAULT_TTL_SECONDS = 7 * 24 * 60 * 60;

function base64url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function textBytes(value) {
  return new TextEncoder().encode(value);
}

async function hmac(secret, value) {
  const key = await crypto.subtle.importKey(
    "raw",
    textBytes(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return base64url(await crypto.subtle.sign("HMAC", key, textBytes(value)));
}

async function sha256(value) {
  return base64url(await crypto.subtle.digest("SHA-256", textBytes(value)));
}

function parseCookies(header) {
  const cookies = {};
  for (const chunk of (header || "").split(";")) {
    const index = chunk.indexOf("=");
    if (index === -1) continue;
    cookies[chunk.slice(0, index).trim()] = chunk.slice(index + 1).trim();
  }
  return cookies;
}

async function validSession(request, secret) {
  const token = parseCookies(request.headers.get("Cookie"))[COOKIE_NAME];
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const expires = Number(parts[0]);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const expected = await hmac(secret, String(expires));
  return expected === parts[1];
}

function loginPage(message = "") {
  const feedback = message
    ? `<p class="msg" role="alert">${message}</p>`
    : "";

  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Piccolabellavista Concierge</title>
  <style>
    :root{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#15304a;background:#f5f1e8}
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px}
    main{width:min(100%,420px);background:white;border-radius:22px;padding:28px;box-shadow:0 18px 50px #15304a22}
    h1{font-size:1.6rem;margin:0 0 8px}p{line-height:1.45;margin:0 0 18px}.small{font-size:.9rem;color:#52606d}.msg{padding:10px 12px;border-radius:12px;background:#fff3cd;color:#664d03}
    label{display:block;font-weight:700;margin-bottom:8px}input{width:100%;font-size:1.35rem;letter-spacing:.14em;text-align:center;padding:14px;border:1px solid #aab7c4;border-radius:12px}
    button{width:100%;margin-top:14px;padding:14px;border:0;border-radius:12px;background:#153f66;color:white;font-size:1rem;font-weight:700;cursor:pointer}
    button:focus,input:focus{outline:3px solid #89b9df;outline-offset:2px}
  </style>
</head>
<body>
  <main>
    <h1>Benvenuti a Piccolabellavista</h1>
    <p>Inserisci il codice ricevuto con le informazioni del soggiorno.</p>
    ${feedback}
    <form method="post" action="/__guest-login" autocomplete="off">
      <label for="pin">Codice ospite</label>
      <input id="pin" name="pin" type="password" inputmode="numeric" autocomplete="one-time-code" minlength="4" maxlength="16" required autofocus>
      <button type="submit">Entra nel Concierge</button>
    </form>
    <p class="small" style="margin-top:18px">Guest access · Zugang für Gäste · Accès réservé</p>
  </main>
</body>
</html>`;
}

function htmlResponse(html, status = 200, extraHeaders = {}) {
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, private",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (!env.GUEST_PIN || !env.SESSION_SECRET) {
    return new Response("Guest access is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (url.pathname === "/__guest-logout") {
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/",
        "Set-Cookie": `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
        "Cache-Control": "no-store",
      },
    });
  }

  if (url.pathname === "/__guest-login" && request.method === "POST") {
    const form = await request.formData();
    const submittedPin = String(form.get("pin") || "").trim();
    const [submittedHash, configuredHash] = await Promise.all([
      sha256(submittedPin),
      sha256(String(env.GUEST_PIN).trim()),
    ]);

    if (submittedHash !== configuredHash) {
      return htmlResponse(loginPage("Codice non corretto. Riprova."), 401);
    }

    const ttl = Math.max(3600, Number(env.GUEST_SESSION_TTL_SECONDS) || DEFAULT_TTL_SECONDS);
    const expires = Date.now() + ttl * 1000;
    const signature = await hmac(env.SESSION_SECRET, String(expires));

    return new Response(null, {
      status: 303,
      headers: {
        Location: "/",
        "Set-Cookie": `${COOKIE_NAME}=${expires}.${signature}; Path=/; Max-Age=${ttl}; HttpOnly; Secure; SameSite=Lax`,
        "Cache-Control": "no-store",
      },
    });
  }

  if (await validSession(request, env.SESSION_SECRET)) {
    const response = await context.next();
    const secured = new Response(response.body, response);
    secured.headers.set("Cache-Control", "no-store, private");
    secured.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return secured;
  }

  const acceptsHtml = (request.headers.get("Accept") || "").includes("text/html");
  if (request.method === "GET" && (acceptsHtml || url.pathname === "/")) {
    return htmlResponse(loginPage());
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
