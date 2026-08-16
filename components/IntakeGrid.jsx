'use client';
import { useMemo, useState } from 'react';

function Stars({ rating }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const starStyle = { fontFamily: "'Cinzel', serif", fontSize: '13px', letterSpacing: '2px', whiteSpace: 'nowrap' };
  return (
    <span style={{ position: 'relative', display: 'inline-block', ...starStyle, color: 'rgba(84,22,29,0.25)' }}>
      ★★★★★
      <span style={{ position: 'absolute', top: 0, left: 0, width: `${pct}%`, overflow: 'hidden', ...starStyle, color: '#54161D' }}>
        ★★★★★
      </span>
    </span>
  );
}

function IntakeModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(84,22,29,0.15)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#FFFBF0',
        border: '0.75px solid rgba(84,22,29,0.25)',
        maxWidth: '560px', width: '100%',
        padding: '48px', position: 'relative',
        maxHeight: '85vh', overflowY: 'auto',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Cinzel', serif", fontSize: '11px',
          letterSpacing: '1.5px', color: 'rgba(84,22,29,0.5)',
        }}>
          CLOSE ×
        </button>

        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: '9px',
          letterSpacing: '1.5px', color: '#54161D',
          border: '0.5px solid rgba(84,22,29,0.3)',
          padding: '4px 10px', display: 'inline-block', marginBottom: '16px',
        }}>
          {item.category?.toUpperCase()}
        </span>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: '500', color: '#54161D', lineHeight: '1.2', marginBottom: item.creator ? '4px' : '10px' }}>
          {item.title}
        </h2>

        {item.creator && (
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '16px', color: 'rgba(84,22,29,0.6)', marginBottom: '10px' }}>
            {item.creator}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Stars rating={item.rating || 0} />
          {item.date && (
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '1.5px', color: 'rgba(84,22,29,0.45)' }}>
              {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>

        {item.cover && (
          <img src={item.cover} alt={item.title} style={{ width: '100%', height: 'auto', display: 'block', marginBottom: '24px' }}/>
        )}

        {item.content?.split('\n\n').map((para, i) => (
          <p key={i} style={{
            fontFamily: "'Inter', sans-serif", fontWeight: '300',
            fontSize: '14px', color: 'rgba(84,22,29,0.8)',
            lineHeight: '1.75', marginBottom: '14px',
          }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

const BASE_CATEGORIES = ['Books', 'Albums', 'Films', 'Places', 'Things', 'Art'];

export default function IntakeGrid({ items }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const categories = useMemo(() => {
    const fromItems = items.map(i => i.category).filter(Boolean);
    const set = new Set([...BASE_CATEGORIES, ...fromItems]);
    return ['All', ...Array.from(set)];
  }, [items]);

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory);

  return (
    <>
      <style>{`
        .intake-card {
          border: 0.5px solid rgba(84,22,29,0.15);
          transition: border-color 0.2s ease;
          cursor: pointer;
          text-align: left;
          background: none;
          display: block;
          width: 100%;
          padding: 0;
        }
        .intake-card:hover { border-color: rgba(84,22,29,0.45); }
        .intake-tab {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          padding: 8px 16px;
          border: 0.5px solid rgba(84,22,29,0.25);
          background: none;
          cursor: pointer;
          color: rgba(84,22,29,0.6);
          transition: background 0.18s ease, color 0.18s ease;
        }
        .intake-tab.active, .intake-tab:hover {
          background: #54161D;
          color: #FFFBF0;
        }
      `}</style>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`intake-tab${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: 'rgba(84,22,29,0.4)', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>
          Nothing here yet.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map(item => (
            <button key={item.slug} className="intake-card" onClick={() => setSelected(item)}>
              {item.cover ? (
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: 'rgba(84,22,29,0.08)' }}>
                  <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                </div>
              ) : (
                <div style={{ width: '100%', aspectRatio: '1/1', background: 'rgba(84,22,29,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '1.5px', color: 'rgba(84,22,29,0.3)', padding: '0 16px', textAlign: 'center' }}>
                    {item.title?.toUpperCase()}
                  </p>
                </div>
              )}
              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: "'Cinzel', serif", fontSize: '9px',
                    letterSpacing: '1px', color: 'rgba(84,22,29,0.5)',
                  }}>
                    {item.category?.toUpperCase()}
                  </span>
                  <Stars rating={item.rating || 0} />
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '19px', fontWeight: '500',
                  color: '#54161D', lineHeight: '1.3',
                }}>
                  {item.title}
                </h2>
                {item.creator && (
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                    fontSize: '13px', color: 'rgba(84,22,29,0.55)',
                    marginTop: '2px',
                  }}>
                    {item.creator}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      <IntakeModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
