// @ts-nocheck
'use client';

import { useEffect, useImperativeHandle, useRef, useState } from 'react';

/**
 * A muted, looping, inline video that only starts downloading once it is close
 * to the screen. The poster shows immediately, so nothing looks empty, and the
 * video file itself never competes with the first screen for bandwidth.
 *
 * Pass `muted` to control sound from the parent (defaults to muted, which
 * autoplay requires). `videoRef` exposes the underlying element.
 */
export default function LazyVideo({
  sources = [],
  poster,
  className = '',
  ariaLabel,
  rootMargin = '300px',
  muted = true,
  videoRef,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useImperativeHandle(videoRef, () => ref.current);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted, visible]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay={visible}
      loop
      muted={muted}
      playsInline
      preload="none"
      aria-label={ariaLabel}
      {...rest}
    >
      {visible ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />) : null}
    </video>
  );
}
