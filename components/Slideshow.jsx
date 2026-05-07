'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CREAM = '#FFFBF0';

const slides = [
  { image: CREAM, label: 'Blog',     href: '/blog' },
  { image: CREAM, label: 'Recipes',  href: '/recipes' },
  { image: CREAM, label: 'Projects', href: '/projects' },
  { image: CREAM, label: 'Visual',   href: '/visual' },
  { image: CREAM, label: 'About',    href: '/about' },
];

/* Each slide has 4 placeholder photos with wave positions */
const slidePhotos = slides.map((_, si) => [
  { w: 200, h: 140, xPct: 8,  yPct: 20 + Math.sin((si * 0.7 + 0) * Math.PI) * 12, rot: -4 + si },
  { w: 160, h: 210, xPct: 28, yPct: 35 + Math.sin((si * 0.7 + 1) * Math.PI) * 12, rot:  3 - si * 0.5 },
  { w: 210, h: 150, xPct: 55, yPct: 22 + Math.sin((si * 0.7 + 2) * Math.PI) * 12, rot: -2 + si * 0.7 },
  { w: 170, h: 190, xPct: 76, yPct: 38 + Math.sin((si * 0.7 + 3) * Math.PI) * 12, rot:  5 - si },
]);

function PhotoStrip({ current, fading }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
      {/* Wide strip — one panel per slide */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: `${slides.length * 100}%`,
        height: '100%',
        transform: `translateX(${-current * (100 / slides.length)}%)`,
        transition: fading ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        willChange: 'transform',
      }}>
        {slides.map((slide, si) => (
          <div key={si} style={{
            position: 'absolute', top: 0,
            left: `${si * (100 / slides.length)}%`,
            width: `${100 / slides.length}%`,
            height: '100%',
          }}>
            {slidePhotos[si].map((photo, pi) => (
              <div key={pi} style={{
                position: 'absolute',
                left: `${photo.xPct}%`,
                top: `${photo.yPct}%`,
                transform: `translate(-50%, -50%) rotate(${photo.rot}deg)`,
                width: `${photo.w}px`,
                height: `${photo.h}px`,
                background: 'rgba(84,22,29,0.07)',
                border: '0.5px solid rgba(84,22,29,0.12)',
                boxShadow: '0 4px 20px rgba(84,22,29,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '8px', letterSpacing: '1px',
                  color: 'rgba(84,22,29,0.25)',
                  textAlign: 'center', padding: '8px',
                }}>
                  {slide.label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (index) => {
    if (index === current || fading) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, fading]);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden', background: CREAM,
    }}>
      <PhotoStrip current={current} fading={fading} />

      {/* Clickable overlay */}
      <Link href={slides[current].href} style={{
        position: 'absolute', inset: 0, zIndex: 2, display: 'block',
      }}/>

      {/* Category label */}
      <div style={{
        position: 'absolute', bottom: '80px',
        left: 'calc(var(--border-width) + 32px)',
        zIndex: 10,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: '11px',
          letterSpacing: '3px', color: 'rgba(84,22,29,0.5)', marginBottom: '6px',
        }}>
          EXPLORE
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '400', color: '#54161D', lineHeight: '1',
        }}>
          {slides[current].label}
        </h2>
      </div>

      {/* Dot indicators */}
      <div style={{
        position: 'absolute', bottom: '32px',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '10px', zIndex: 10,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} style={{
            width: i === current ? '24px' : '8px', height: '8px',
            borderRadius: '4px', background: '#54161D',
            opacity: i === current ? 0.7 : 0.2,
            border: 'none', cursor: 'pointer', padding: 0,
            transition: 'width 0.3s ease, opacity 0.3s ease',
          }}/>
        ))}
      </div>
    </div>
  );
}