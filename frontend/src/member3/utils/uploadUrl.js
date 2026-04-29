/**
 * API stores paths like /uploads/file.jpg. Use same-origin URLs so the CRA proxy
 * (or production reverse proxy) can forward to Spring; do not hardcode backend port.
 */
export function uploadUrl(path) {
  if (path == null || path === '') return '';
  const s = String(path).trim();
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  return s.startsWith('/') ? s : `/${s}`;
}
