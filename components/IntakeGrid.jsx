'use client';
import { useMemo, useState } from 'react';

function RatingBadge({ rating }) {
  const n = Number(rating || 0);
  return (
    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '13px', letterSpacing: '1px', whiteSpace: 'nowrap', color: '#54161D' }}>
      {n === 10 ? '10' : n.toFixed(1)}
      <span style={{ color: 'rgba(84,22,29,0.4)' }}>/10</span>
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
          <RatingBadge rating={item.rating} />
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

const SORT_OPTIONS = [
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
];

export default function IntakeGrid({ items }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [selected, setSelected] = useState(null);

  const categories = useMemo(() => {
    const fromItems = items.map(i => i.category).filter(Boolean);
    const set = new Set([...BASE_CATEGORIES, ...fromItems]);
    return ['All', ...Array.from(set)];
  }, [items]);

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === 'date-desc') arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sortBy === 'date-asc') arr.sort((a, b) => new Date(a.date) - new Date(b.date));
    else arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return arr;
  }, [filtered, sortBy]);

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
        .intake-sort {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 1px;
          padding: 8px 28px 8px 12px;
          border: 0.5px solid rgba(84,22,29,0.25);
          background: #FFFBF0;
          color: rgba(84,22,29,0.7);
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0L5 6L10 0' fill='%2354161D' fill-opacity='0.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }
        .intake-sort:hover { border-color: rgba(84,22,29,0.45); }
      `}</style>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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

        <select
          className="intake-sort"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          aria-label="Sort entries"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {sorted.length === 0 ? (
        <p style={{ color: 'rgba(84,22,29,0.4)', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>
          Nothing here yet.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {sorted.map(item => (
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
                  <RatingBadge rating={item.rating} />
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
