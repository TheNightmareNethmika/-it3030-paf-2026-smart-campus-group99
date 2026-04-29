/**
 * Google OAuth must hit the Spring Boot backend. In dev, CRA proxies /oauth2/** to the API.
 * If the proxy fails, set REACT_APP_API_BASE_URL (e.g. http://127.0.0.1:10200) in .env.development.
 */
export function getGoogleAuthorizationUrl() {
  const base = (process.env.REACT_APP_API_BASE_URL || '').trim().replace(/\/$/, '');
  if (base) {
    return `${base}/oauth2/authorization/google`;
  }
  return '/oauth2/authorization/google';
}
