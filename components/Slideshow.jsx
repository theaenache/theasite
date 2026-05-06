'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ─── SLIDES CONFIG ───────────────────────────────────────────────────────
   Add your real photo paths below. Photos will auto-convert to B&W.
   Use null for placeholders until you have the real photos.
   ──────────────────────────────────────────────────────────────────────── */
const slides = [
  {
    label: 'Blog',
    href: '/blog',
    photos: [
      { src: null, w: 200, h: 140, label: 'Blog 1' },
      { src: null, w: 160, h: 200, label: 'Blog 2' },
      { src: null, w: 220, h: 150, label: 'Blog 3' },
      { src: null, w: 170, h: 130, label: 'Blog 4' },
    ],
  },
  {
    label: 'Recipes',
    href: '/recipes',
    photos: [
      { src: null, w: 190, h: 150, label: 'Recipes 1' },
      { src: null, w: 160, h: 210, label: 'Recipes 2' },
      { src: null, w: 200, h: 140, label: 'Recipes 3' },
      { src: null, w: 180, h: 160, label: 'Recipes 4' },
    ],
  },
  {
    label: 'Projects',
    href: '/projects',
    photos: [
      { src: null, w: 210, h: 140, label: 'Projects 1' },
      { src: null, w: 160, h: 200, label: 'Projects 2' },
      { src: null, w: 190, h: 150, label: 'Projects 3' },
      { src: null, w: 170, h: 180, label: 'Projects 4' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    photos: [
      { src: null, w: 180, h: 220, label: 'About 1' },
      { src: null, w: 200, h: 140, label: 'About 2' },
      { src: null, w: 160, h: 190, label: 'About 3' },
      { src: null, w: 210, h: 150, label: 'About 4' },
    ],
  },
];

/* Sine wave positions for each photo in a panel */
function getPhotoPositions(photos) {
  const positions = [];
  const n = photos.length;
  photos.forEach((photo, i) => {
    const xPercent = 8 + (i / (n - 0.5)) * 82;
    // sine wave for y — alternates up and down
    const sineY = Math.sin((i / (n - 1)) * Math.PI * 1.5) * 18;
    const yPercent = 28 + sineY;
    // rotation follows the wave direction
    const rotation = Math.cos((i / (n - 1)) * Math.PI * 1.5) * 6;
    positions.push({ xPercent, yPercent, rotation });
  });
  return positions;
}

function PhotoStrip({ current, fading }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      zIndex: 1,
    }}>
      {/* Wide strip — 4 panels side by side */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '400%',
        height: '100%',
        transform: `translateX(${-current * 25}%)`,
        transition: fading ? 'transform 0.5s ease' : 'none',
        willChange: 'transform',
      }}>
        {slides.map((slide, slideIndex) => {
          const positions = getPhotoPositions(slide.photos);
          return (
            <div key={slideIndex} style={{
              position: 'absolute',
              top: 0,
              left: `${slideIndex * 25}%`,
              width: '25%',
              height: '100%',
            }}>
              {slide.photos.map((photo, photoIndex) => {
                const pos = positions[photoIndex];
                return (
                  <div key={photoIndex} style={{
                    position: 'absolute',
                    left: `${pos.xPercent}%`,
                    top: `${pos.yPercent}%`,
                    transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
                    width: `${photo.w}px`,
                    height: `${photo.h}px`,
                    boxShadow: '0 4px 20px rgba(84,22,29,0.15)',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    {photo.src ? (
                      <img
                        src={photo.src}
                        alt={photo.label}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'grayscale(100%) contrast(1.05)',
                          display: 'block',
                        }}
                      />
                    ) : (
                      /* Placeholder */
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(84,22,29,0.08)',
                        border: '0.5px solid rgba(84,22,29,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <p style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: '9px',
                          letterSpacing: '1.5px',
                          color: 'rgba(84,22,29,0.3)',
                          textAlign: 'center',
                          padding: '8px',
                        }}>
                          {photo.label.toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
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
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, fading]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#FFFBF0',
    }}>

      {/* Photo strip behind everything */}
      <PhotoStrip current={current} fading={fading} />

      {/* Clickable overlay linking to category */}
      <Link href={slides[current].href} style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'block',
      }}/>

      {/* Category label — bottom left */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: 'calc(var(--border-width) + 32px)',
        zIndex: 10,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'rgba(84,22,29,0.5)',
          marginBottom: '6px',
        }}>
          EXPLORE
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '400',
          color: '#54161D',
          lineHeight: '1',
        }}>
          {slides[current].label}
        </h2>
      </div>

      {/* Dot indicators */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 10,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: '#54161D',
              opacity: i === current ? 0.7 : 0.2,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s ease, opacity 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}