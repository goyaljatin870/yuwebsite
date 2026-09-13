const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/goyaljatin870/yuwebsite/main/public';

function stripPublicPrefix(path) {
  if (!path) return '';
  const publicUrl = process.env.PUBLIC_URL || '';
  let clean = path;
  if (publicUrl && clean.startsWith(publicUrl)) {
    clean = clean.slice(publicUrl.length);
  }
  if (clean.startsWith('/yuwebsite')) {
    clean = clean.slice('/yuwebsite'.length);
  }
  return clean.startsWith('/') ? clean : `/${clean}`;
}

export function getAssetUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const publicUrl = process.env.PUBLIC_URL || '';
  const cleanPath = stripPublicPrefix(path);
  return `${publicUrl}${cleanPath}`;
}

export function getRawGithubUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const cleanPath = stripPublicPrefix(path);
  return `${GITHUB_RAW_BASE}${cleanPath}`;
}

