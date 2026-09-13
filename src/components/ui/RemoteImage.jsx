import React, { useState, useCallback, useMemo } from 'react';

const svgPlaceholder = (w, h) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#faedf0"/><stop offset="100%" stop-color="#d88b99"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  )}`;

/**
 * External image: primary URL, then deterministic Picsum seed, then local SVG gradient.
 */
export default function RemoteImage({
  src,
  alt = '',
  className,
  width,
  height,
  loading,
  fallbackSeed = 'yu',
  decoding = 'async',
  ...rest
}) {
  const w = Math.min(Number(width) || 800, 1200);
  const h = Math.min(Number(height) || 600, 1200);

  const fallbackSrc = useMemo(
    () =>
      `https://picsum.photos/seed/${encodeURIComponent(String(fallbackSeed))}/${w}/${h}`,
    [fallbackSeed, w, h]
  );

  const finalSrc = useMemo(() => svgPlaceholder(w, h), [w, h]);

  /** 0 = primary, 1 = picsum, 2 = data-uri (stop) */
  const [tier, setTier] = useState(0);

  const currentSrc = tier === 0 ? src : tier === 1 ? fallbackSrc : finalSrc;

  const onError = useCallback(() => {
    setTier((t) => (t < 2 ? t + 1 : t));
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
      onError={tier < 2 ? onError : undefined}
    />
  );
}
