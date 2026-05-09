'use client';
import { useEffect, useRef } from 'react';

export default function ScrollZoom({ children, style, subtle = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const elCenter = rect.top + rect.height / 2;
      const viewCenter = viewH / 2;
      const dist = Math.abs(elCenter - viewCenter) / viewH;

      let scale, opacity;
      if (subtle) {
        // Hero image — stays big, shrinks less
        scale = Math.max(0.94, 1.18 - dist * 0.8);
        opacity = Math.max(0.75, 1 - dist * 0.4);
      } else {
        // Regular images — dramatic range
        scale = Math.max(0.78, 1.25 - dist * 1.8);
        opacity = Math.max(0.35, 1 - dist * 1.0);
      }

      el.style.transform = `scale(${scale})`;
      el.style.opacity = opacity;
    };

    update();
    document.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      document.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [subtle]);

  return (
    <div
      ref={ref}
      style={{
        transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out',
        transformOrigin: 'center center',
        ...style,
      }}
    >
      {children}
    </div>
  );
}