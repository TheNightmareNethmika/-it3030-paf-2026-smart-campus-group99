const path = require('path');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const portFile = path.join(__dirname, '..', '..', 'backend', '.dev-server-port');

function backendTarget() {
  try {
    const p = fs.readFileSync(portFile, 'utf8').trim();
    if (/^\d+$/.test(p)) {
      return `http://127.0.0.1:${p}`;
    }
  } catch (_) {
    /* backend not started yet, or file missing */
  }
  return 'http://127.0.0.1:10200';
}

module.exports = function (app) {
  // HPM v3: `router` must return a URL string (or { protocol, host, port }), not { target: '...' }.
  // Wrong shape triggers the default error plugin → browser sees HTTP 500 on proxied routes.
  const initialTarget = backendTarget();
  app.use(
    createProxyMiddleware({
      target: initialTarget,
      pathFilter: (pathname) =>
        pathname.startsWith('/api') ||
        pathname.startsWith('/auth') ||
        pathname.startsWith('/oauth2') ||
        pathname.startsWith('/login/oauth2') ||
        pathname.startsWith('/uploads'),
      changeOrigin: true,
      secure: false,
      logLevel: 'warn',
      router: () => backendTarget(),
    })
  );
};
