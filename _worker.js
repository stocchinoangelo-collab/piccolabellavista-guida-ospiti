const PRODUCTION_HOSTS = new Set([
  'piccolabellavista-guida-ospiti.pages.dev',
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!PRODUCTION_HOSTS.has(url.hostname)) {
      return new Response('Not found', {
        status: 404,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'text/plain; charset=UTF-8',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
