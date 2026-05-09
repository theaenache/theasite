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
  { xPct: 12, yPct: 30, wPct: 18, hPct: 32, rot: -3 },
  { xPct: 33, yPct: 36, wPct: 16, hPct: 28, rot:  2 },
  { xPct: 54, yPct: 28, wPct: 20, hPct: 35, rot: -2 },
  { xPct: 74, yPct: 34, wPct: 16, hPct: 30, rot:  3 },
];

const aboutLayouts = [
  { xPct: 18, yPct: 12, wPct: 'clamp(140px, 22%, 260px)', hPct: 66, rot: -2 },
  { xPct: 55, yPct: 15, wPct: 'clamp(140px, 22%, 260px)', hPct: 66, rot:  2 },
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

const wiggleStyle = `
  @keyframes wiggle-left {
    0%   { transform: rotate(-3deg) scale(1); }
    100% { transform: rotate(-6deg) scale(1.02); }
  }
  @keyframes wiggle-right {
    0%   { transform: rotate(3deg) scale(1); }
    100% { transform: rotate(6deg) scale(1.02); }
  }
  @keyframes wiggle-neg2 {
    0%   { transform: rotate(-2deg) scale(1); }
    100% { transform: rotate(-5deg) scale(1.02); }
  }
  @keyframes wiggle-pos2 {
    0%   { transform: rotate(2deg) scale(1); }
    100% { transform: rotate(5deg) scale(1.02); }
  }
  @keyframes wiggle-left-centered {
    0%   { transform: translate(0, -50%) rotate(-2deg) scale(1); }
    100% { transform: translate(0, -50%) rotate(-5deg) scale(1.02); }
  }
  @keyframes wiggle-right-centered {
    0%   { transform: translate(0, -50%) rotate(2deg) scale(1); }
    100% { transform: translate(0, -50%) rotate(5deg) scale(1.02); }
  }
  .photo-card { transition: box-shadow 0.2s ease; }
  .photo-card:hover { box-shadow: 0 8px 32px rgba(84,22,29,0.2) !important; }
  .photo-card.rot-n3:hover { animation: wiggle-left 0.2s ease forwards; }
  .photo-card.rot-p2:hover { animation: wiggle-right 0.2s ease forwards; }
  .photo-card.rot-n2:hover { animation: wiggle-neg2 0.2s ease forwards; }
  .photo-card.rot-p3:hover { animation: wiggle-pos2 0.2s ease forwards; }
  .photo-card.rot-centered-neg:hover { animation: wiggle-left-centered 0.2s ease forwards; }
  .photo-card.rot-centered-pos:hover { animation: wiggle-right-centered 0.2s ease forwards; }
`;

function PhotoPanel({ slide, si, slideLabel }) {
  const isAbout = slideLabel === 'About';
  const photos = slidePhotos[si];
  const layouts = isAbout ? aboutLayouts : baseLayouts;

  return (
    <div style={{ position: 'absolute', top: 0, left: `${si * (100 / slides.length)}%`, width: `${100 / slides.length}%`, height: '100%' }}>
      {photos.map((photo, pi) => {
        const layout = layouts[pi % layouts.length];
        const rotMap = { '-3': 'rot-n3', '2': 'rot-p2', '-2': 'rot-n2', '3': 'rot-p3' };
        const baseRotClass = rotMap[String(layout.rot)] || (layout.rot < 0 ? 'rot-n2' : 'rot-p2');
        const rotClass = isAbout ? (layout.rot < 0 ? 'rot-centered-neg' : 'rot-centered-pos') : baseRotClass;
        return (
          <a key={pi} href={slide.href} className={`photo-card ${rotClass}`} style={{
            position: 'absolute',
            left: `${layout.xPct}%`,
            top: isAbout ? '50%' : `calc(72px + ${layout.yPct}%)`,
            transform: isAbout
              ? `translate(0, -50%) rotate(${layout.rot}deg)`
              : `rotate(${layout.rot}deg)`,
            width: typeof layout.wPct === 'string' ? layout.wPct : `${layout.wPct}%`,
            height: isAbout ? 'calc(100vh - 120px)' : undefined,
            paddingBottom: isAbout ? undefined : `${layout.hPct}%`,
            '--rot': `${layout.rot}deg`,
            boxShadow: '0 4px 20px rgba(84,22,29,0.1)',
            overflow: 'hidden',
            display: 'block',
            textDecoration: 'none',
            zIndex: 4,
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
          </a>
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

    >
      <style>{wiggleStyle}</style>
      {/* Swipe capture layer — touch only, doesn't block mouse hover */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
      />
      <PhotoStrip current={current} fading={fading} />



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

      {/* Left arrow */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        style={{
          position: 'absolute', left: 'calc(var(--border-width) + 12px)',
          top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'none', border: 'none',
          cursor: 'pointer', padding: '8px',
          opacity: 0.25, transition: 'opacity 0.2s ease',
          fontFamily: "'Cinzel', serif", fontSize: '16px',
          color: '#54161D', lineHeight: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.25}
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        aria-label="Next slide"
        style={{
          position: 'absolute', right: 'calc(var(--border-width) + 12px)',
          top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'none', border: 'none',
          cursor: 'pointer', padding: '8px',
          opacity: 0.25, transition: 'opacity 0.2s ease',
          fontFamily: "'Cinzel', serif", fontSize: '16px',
          color: '#54161D', lineHeight: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.25}
      >
        ›
      </button>

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