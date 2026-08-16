'use client';

const categories = [
  { label: 'Blog',     href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Visual',   href: '/visual' },
  { label: 'Intake',   href: '/intake' },
  { label: 'About',    href: '/about' },
];

const patterns = [
  '/patterns/patt1.png',
  '/patterns/patt2.png',
  '/patterns/patt3.png',
  '/patterns/patt4.png',
  '/patterns/patt5.png',
  '/patterns/patt6.png',
  '/patterns/patt7.png',
];

/* Build one full loop: [pattern, category, pattern, category, ...] */
function buildItems() {
  const items = [];
  categories.forEach((cat, i) => {
    items.push({ type: 'pattern', src: patterns[i % patterns.length], key: `pat-${i}` });
    items.push({ type: 'category', ...cat, key: `cat-${i}` });
  });
  return items;
}

const items = buildItems();
const doubled = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items]; /* x8 for no gap */

export default function NavMarquee() {
  return (
    <div style={{
      position: 'relative', zIndex: 51,
      width: '100%',
      borderTop: '0.5px solid rgba(84,22,29,0.12)',
      borderBottom: '0.5px solid rgba(84,22,29,0.12)',
      background: '#FFFBF0',
      overflow: 'hidden',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <style>{`
        @keyframes navMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .nav-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: navMarquee 60s linear infinite;
        }
        .nav-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .nav-marquee-track {
            animation-duration: 60s;
          }
        }
        .nav-cat-link {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 3px;
          color: #54161D;
          text-decoration: none;
          padding: 0 28px;
          white-space: nowrap;
          opacity: 0.7;
          transition: opacity 0.18s ease, letter-spacing 0.18s ease;
        }
        .nav-cat-link:hover {
          opacity: 1;
          letter-spacing: 4px;
        }
        .nav-pattern {
          height: 36px;
          width: auto;
          object-fit: contain;
          opacity: 0.85;
          flex-shrink: 0;
        }
        .nav-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(84,22,29,0.25);
          flex-shrink: 0;
          margin: 0 4px;
        }
      `}</style>

      <div className="nav-marquee-track">
        {doubled.map((item, i) =>
          item.type === 'pattern' ? (
            <img
              key={i}
              src={item.src}
              alt=""
              className="nav-pattern"
            />
          ) : (
            <a
              key={i}
              href={item.href}
              className="nav-cat-link"
            >
              {item.label.toUpperCase()}
            </a>
          )
        )}
      </div>
    </div>
  );
}