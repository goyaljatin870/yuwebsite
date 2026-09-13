import React, { useState, useCallback, useMemo } from 'react';
import { getAssetUrl } from '../../utils/assetUrl';

const svgPlaceholder = (w, h) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#faedf0"/><stop offset="100%" stop-color="#d88b99"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  )}`;

/**
 * Image component that automatically resolves relative paths with PUBLIC_URL
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
  const placeholderSrc = useMemo(() => svgPlaceholder(w, h), [w, h]);

  const [failed, setFailed] = useState(false);
  const currentSrc = failed ? placeholderSrc : resolvedSrc;

  const onError = useCallback(() => {
    setFailed(true);
  }, []);

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
      onError={!failed ? onError : undefined}
    />
  );
}
