'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const slides = [
  { label: 'Blog',     href: '/blog' },
  { label: 'Recipes',  href: '/recipes' },
  { label: 'Projects', href: '/projects' },
  { label: 'Visual',   href: '/visual' },
  { label: 'About',    href: '/about' },
];

const baseLayouts = [
  { xPct: 12, yPct: 15, wPct: 18, hPct: 32, rot: -3 },
  { xPct: 33, yPct: 22, wPct: 16, hPct: 28, rot:  2 },
  { xPct: 54, yPct: 12, wPct: 20, hPct: 35, rot: -2 },
  { xPct: 74, yPct: 20, wPct: 16, hPct: 30, rot:  3 },
];

const aboutLayouts = [
  { xPct: 20, yPct: 5, wPct: 22, hPct: 66, rot: -2 },
  { xPct: 57, yPct: 8, wPct: 22, hPct: 66, rot:  2 },
];

const slidePhotos = [
  [ // Blog
    { src: null },
    { src: null },
    { src: null },
    { src: null },
  ],
  [ // Recipes
    { src: null },
    { src: null },
    { src: null },
    { src: null },
  ],
  [ // Projects
    { src: null },
    { src: null },
    { src: null },
    { src: null },
  ],
  [ // Visual
    { src: null },
    { src: null },
    { src: null },
    { src: null },
  ],
  [ // About — two tall photo strips
    { src: '/images/slideshow/about/aboutss-1.png' },
    { src: '/images/slideshow/about/aboutss-2.png' },
  ],
];

function PhotoPanel({ slide, si, slideLabel }) {
  const isAbout = slideLabel === 'About';
  const photos = slidePhotos[si];
  const layouts = isAbout ? aboutLayouts : baseLayouts;

  return (
    <div style={{ position: 'absolute', top: 0, left: `${si * (100 / slides.length)}%`, width: `${100 / slides.length}%`, height: '100%' }}>
      {photos.map((photo, pi) => {
        const layout = layouts[pi % layouts.length];
        return (
          <div key={pi} style={{
            position: 'absolute',
            left: `${layout.xPct}%`,
            top: `${layout.yPct}%`,
            width: `${layout.wPct}%`,
            paddingBottom: `${layout.hPct}%`,
            transform: `rotate(${layout.rot}deg)`,
            boxShadow: '0 4px 20px rgba(84,22,29,0.1)',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0 }}>
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={slideLabel}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%) sepia(25%) contrast(1.08) brightness(1.08)',
                    display: 'block',
                  }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'rgba(84,22,29,0.07)',
                  border: '0.5px solid rgba(84,22,29,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <p style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '9px', letterSpacing: '1.5px',
                    color: 'rgba(84,22,29,0.25)',
                    textAlign: 'center', padding: '8px',
                  }}>
                    {slideLabel.toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PhotoStrip({ current, fading }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: `${slides.length * 100}%`,
        height: '100%',
        transform: `translateX(${-current * (100 / slides.length)}%)`,
        transition: fading ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        willChange: 'transform',
      }}>
        {slides.map((slide, si) => (
          <PhotoPanel key={si} slide={slide} si={si} slideLabel={slide.label} />
        ))}
      </div>
    </div>
  );
}

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const goTo = (index) => {
    if (index === current || fading) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 600);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo((current + 1) % slides.length);
      else goTo((current - 1 + slides.length) % slides.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, fading]);

  return (
    <div
      style={{
        position: 'relative', width: '100%', height: '100vh',
        overflow: 'hidden', background: '#FFFBF0',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <PhotoStrip current={current} fading={fading} />

      <Link href={slides[current].href} style={{
        position: 'absolute', inset: 0, zIndex: 2, display: 'block',
      }}/>

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