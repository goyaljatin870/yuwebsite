import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { getAssetUrl, getRawGithubUrl } from '../../utils/assetUrl';

const svgPlaceholder = (w, h) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#faedf0"/><stop offset="100%" stop-color="#d88b99"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  )}`;

/**
 * Image component that automatically resolves relative paths with PUBLIC_URL,
 * gracefully retries with GitHub raw CDN if relative hosting fails,
 * and cleanly falls back to an SVG placeholder without flashing random third-party photos.
 */
export default function RemoteImage({
  src,
  alt = '',
  className,
  width,
  height,
  loading,
  decoding = 'async',
  ...rest
}) {
  const w = Math.min(Number(width) || 800, 1200);
  const h = Math.min(Number(height) || 600, 1200);

  const resolvedSrc = useMemo(() => getAssetUrl(src), [src]);
  const rawSrc = useMemo(() => getRawGithubUrl(src), [src]);
  const placeholderSrc = useMemo(() => svgPlaceholder(w, h), [w, h]);

  // tier: 0 = resolvedSrc, 1 = rawSrc, 2 = placeholderSrc
  const [tier, setTier] = useState(0);

  useEffect(() => {
    setTier(0);
  }, [src]);

  let currentSrc = resolvedSrc;
  if (tier === 1) {
    currentSrc = rawSrc;
  } else if (tier >= 2) {
    currentSrc = placeholderSrc;
  }

  const onError = useCallback(() => {
    setTier((prevTier) => {
      if (prevTier === 0 && rawSrc && rawSrc !== resolvedSrc) {
        return 1;
      }
      return 2;
    });
  }, [rawSrc, resolvedSrc]);

  return (
    <img
      {...rest}
      className={className}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      referrerPolicy="no-referrer"
      onError={tier < 2 ? onError : undefined}
    />
  );
}

