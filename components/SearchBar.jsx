'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const WORD_BANK_LIMIT = 24;

export default function SearchBar({ index }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const wordBank = useMemo(() => {
    const seen = new Set();
    const words = [];
    for (const item of index) {
      const key = item.keyword.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        words.push(item.keyword);
      }
    }
    return words.sort((a, b) => a.localeCompare(b)).slice(0, WORD_BANK_LIMIT);
  }, [index]);

  const q = query.trim().toLowerCase();
  const matches = q
    ? index.filter(item => item.keyword.toLowerCase().includes(q)).slice(0, 8)
    : [];

  function go(href) {
    setOpen(false);
    setQuery('');
    router.push(href);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (matches.length > 0) go(matches[0].href);
  }

  return (
    <div style={{ position: 'relative' }}>
      <style>{`
        .search-word-chip {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 1px;
          padding: 5px 10px;
          border: 0.5px solid rgba(84,22,29,0.25);
          background: none;
          cursor: pointer;
          color: rgba(84,22,29,0.6);
          transition: background 0.18s ease, color 0.18s ease;
        }
        .search-word-chip:hover {
          background: #54161D;
          color: #FFFBF0;
        }
      `}</style>

      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle search"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '8px', display: 'flex', alignItems: 'center',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="#54161D" strokeWidth="1.3"/>
          <line x1="11" y1="11" x2="16" y2="16" stroke="#54161D" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 150 }}/>

          <form onSubmit={handleSubmit} style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
            width: '300px', background: '#FFFBF0',
            border: '0.75px solid rgba(84,22,29,0.2)',
            borderTop: '2px solid #54161D',
            zIndex: 300, padding: '12px',
          }}>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search keywords..."
              style={{
                width: '100%', border: 'none', outline: 'none', background: 'none',
                fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '1px',
                color: '#54161D', padding: '6px 4px',
                borderBottom: '0.5px solid rgba(84,22,29,0.2)',
              }}
            />

            {matches.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                {matches.map((m, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(m.href)}
                    style={{
                      textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '7px 6px', display: 'flex', alignItems: 'baseline', gap: '6px',
                    }}
                  >
                    <span style={{
                      fontFamily: "'Cinzel', serif", fontSize: '9px',
                      letterSpacing: '1px', color: 'rgba(84,22,29,0.55)',
                      whiteSpace: 'nowrap',
                    }}>
                      {m.keyword.toUpperCase()}
                    </span>
                    {m.label && (
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: '14px',
                        color: '#54161D',
                      }}>
                        : {m.label}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {q && matches.length === 0 && (
              <p style={{
                marginTop: '10px', fontSize: '11px', color: 'rgba(84,22,29,0.4)',
                fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
              }}>
                No matches.
              </p>
            )}

            {!q && wordBank.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <p style={{
                  fontFamily: "'Cinzel', serif", fontSize: '8px',
                  letterSpacing: '1.5px', color: 'rgba(84,22,29,0.4)',
                  marginBottom: '8px',
                }}>
                  TRY
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {wordBank.map(word => (
                    <button
                      key={word}
                      type="button"
                      className="search-word-chip"
                      onClick={() => setQuery(word)}
                    >
                      {word.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}
