'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Visual', href: '/visual' },
];

/* small SVG embroidery motif shown beside each hovered item */
function MotifIcon() {
  return (
    <img src="/patterns/patt7.png" alt="" style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }} />
  );
}

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const pathname = usePathname();

  return (
    <div style={{ position: 'relative' }}>
      {/* hamby button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', gap: '5px',
          padding: '8px', zIndex: 200, position: 'relative',
        }}
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block', width: '22px', height: '1.5px',
            background: '#54161D',
            transformOrigin: 'center',
            transition: 'transform 0.25s ease, opacity 0.25s ease',
            transform: open
              ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
              : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
              : 'none'
              : 'none',
            opacity: open && i === 1 ? 0 : 1,
          }}/>
        ))}
      </button>

      {/* dropdown, anchored to right edge (WORKING, STILL LOOKS KIND OF GOOFY) */}
      <div style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        width: '200px',
        background: '#FFFBF0',
        border: '0.75px solid rgba(84,22,29,0.2)',
        borderTop: '2px solid #54161D',
        padding: '8px 0',
        zIndex: 300,
        pointerEvents: open ? 'all' : 'none',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}>
        {menuItems.map(item => {
          const isActive = pathname === item.href;
          const isHovered = hovered === item.label;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 20px',
                fontFamily: "'Cinzel', serif",
                fontSize: '12px',
                letterSpacing: '1.5px',
                color: isHovered || isActive
                  ? 'rgba(84,22,29,0.45)'
                  : '#54161D',
                transition: 'color 0.18s ease',
                textDecoration: 'none',
              }}
            >
              <span style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateX(0)' : 'translateX(-6px)',
                transition: 'opacity 0.18s ease, transform 0.18s ease',
              }}>
                <MotifIcon />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* clickaway overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 150 }}
        />
      )}
    </div>
  );
}
