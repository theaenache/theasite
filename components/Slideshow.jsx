'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CREAM = '#FFFBF0';

const slides = [
  { image: CREAM, label: 'Blog',     href: '/blog' },
  { image: CREAM, label: 'Recipes',  href: '/recipes' },
  { image: CREAM, label: 'Projects', href: '/projects' },
  { image: CREAM, label: 'About',    href: '/about' },
  { image: CREAM, label: 'Blog',     href: '/blog' },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (index) => {
    if (index === current || fading) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 400);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (current + 1) % slides.length;
      goTo(next);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, fading]);

  const slide = slides[current];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

      <Link href={slide.href} style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: slide.image,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}/>
      </Link>

      {/* Category label */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: 'calc(var(--border-width) + 32px)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
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
          {slide.label}
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