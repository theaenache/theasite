'use client';
import { useState, useEffect, useRef } from 'react';

const slides = [
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Visual',   href: '/visual' },
  { label: 'Blog',     href: '/blog' },
];

const baseLayouts = [
  { xPct: 12, yPct: 30, wPct: 18, hPct: 32, rot: -3 },
  { xPct: 33, yPct: 36, wPct: 16, hPct: 28, rot:  2 },
  { xPct: 54, yPct: 28, wPct: 20, hPct: 35, rot: -2 },
  { xPct: 74, yPct: 34, wPct: 16, hPct: 30, rot:  3 },
];

const aboutLayouts = [
  { xPct: 12, yPct: 0, wPct: 22, rot: -2 },
  { xPct: 61, yPct: 0, wPct: 22, rot:  2 },
];

const projectsLayouts = [
  { xPct: 9, yPct: 0, wPct: 22, rot: 3 },
  { xPct: 64, yPct: 0, wPct: 22, rot: -3 },
];

const visualLayouts = [
  { xPct: 12, yPct: 0, wPct: 22, rot:  2 },
  { xPct: 62, yPct: 0, wPct: 22, rot: -2 },
];

const blogLayouts = [
  { xPct: 10, yPct: 0, wPct: 22, rot: -3 },
  { xPct: 63, yPct: 0, wPct: 22, rot:  3 },
];

const slidePhotos = [
  [                                                              // About
    { src: '/images/slideshow/about/aboutss-1.png' },
    { src: '/images/slideshow/about/aboutss-2.png' },
  ],
  [                                                              // Projects
    { src: '/images/slideshow/projects/projss-1.png' },
    { src: '/images/slideshow/projects/projss-2.png' },
  ],
  [                                                              // Visual
    { src: '/images/slideshow/visual/visualss-1.png' },
    { src: '/images/slideshow/visual/visualss-2.png' },
  ],
  [                                                              // Blog
    { src: '/images/slideshow/blog/blogss-1.png' },
    { src: '/images/slideshow/blog/blogss-2.png' },
  ],
];

function PhotoCard({ photo, layout, slideLabel, slideHref, isAbout }) {
  const [hovered, setHovered] = useState(false);

  const wiggle = hovered ? (layout.rot < 0 ? -3 : 3) : 0;
  const scale = hovered ? 1.02 : 1;
  const transform = isAbout
    ? `translate(0, -50%) rotate(${layout.rot + wiggle}deg) scale(${scale})`
    : `rotate(${layout.rot + wiggle}deg) scale(${scale})`;

  if (!photo.src) return (
    <div style={{
      position: 'absolute',
      left: `${layout.xPct}%`,
      top: `calc(72px + ${layout.yPct}%)`,
      width: `${layout.wPct}%`,
      paddingBottom: `${layout.hPct}%`,
      transform: `rotate(${layout.rot}deg)`,
      boxShadow: '0 4px 20px rgba(84,22,29,0.1)',
      background: 'transparent',
      zIndex: 4,
    }}/>
  );

  if (isAbout) {
    return (
      <a
        href={slideHref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute',
          left: `${layout.xPct}%`,
          top: '50%',
          transform,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: hovered ? '0 8px 32px rgba(84,22,29,0.2)' : '0 4px 20px rgba(84,22,29,0.1)',
          display: 'block',
          textDecoration: 'none',
          zIndex: hovered ? 8 : 4,
          cursor: 'pointer',
        }}
      >
        <img
          src={photo.src}
          alt={slideLabel}
          style={{
            display: 'block',
            width: 'clamp(140px, 22vw, 260px)',
            height: 'auto',
            filter: 'grayscale(100%) sepia(25%) contrast(1.08) brightness(1.08)',
          }}
        />
      </a>
    );
  }

  return (
    <a
      href={slideHref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: `${layout.xPct}%`,
        top: `calc(72px + ${layout.yPct}%)`,
        width: `${layout.wPct}%`,
        paddingBottom: `${layout.hPct}%`,
        transform,
        boxShadow: hovered ? '0 8px 32px rgba(84,22,29,0.2)' : '0 4px 20px rgba(84,22,29,0.1)',
        overflow: 'hidden',
        display: 'block',
        textDecoration: 'none',
        zIndex: hovered ? 8 : 4,
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
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
      </div>
    </a>
  );
}

function PhotoPanel({ slide, si }) {
  const isAbout = slide.label === 'About';
  const isProjects = slide.label === 'Projects';
  const isVisual = slide.label === 'Visual';
  const isBlog = slide.label === 'Blog';
  const isStrip = isAbout || isProjects || isVisual || isBlog;
  const photos = slidePhotos[si];
  const layouts = isAbout ? aboutLayouts
    : isProjects ? projectsLayouts
    : isVisual ? visualLayouts
    : isBlog ? blogLayouts
    : baseLayouts;

  return (
    <div style={{
      position: 'absolute', top: 0,
      left: `${si * (100 / slides.length)}%`,
      width: `${100 / slides.length}%`,
      height: '100%',
    }}>
      {photos.map((photo, pi) => (
        <PhotoCard
          key={pi}
          photo={photo}
          layout={layouts[pi % layouts.length]}
          slideLabel={slide.label}
          slideHref={slide.href}
          isAbout={isStrip}
        />
      ))}
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
        transition: fading ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        willChange: 'transform',
      }}>
        {slides.map((slide, si) => (
          <PhotoPanel key={si} slide={slide} si={si} />
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
    }, 300);
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
      {/* Large centered motif behind the slides */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/homebackground.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'min(60vw, 700px) auto',
        opacity: 1,
        pointerEvents: 'none',
      }}/>

      <PhotoStrip current={current} fading={fading} />

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
      >‹</button>

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
      >›</button>

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