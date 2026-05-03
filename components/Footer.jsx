'use client';

const socials = [
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/theaenache' },
  { label: 'GitHub',    href: 'https://github.com/theaenache' },
];

export function HomeFooter() {
  return (
    <footer style={{
      padding: '24px calc(var(--border-width) + 24px)',
      borderTop: '0.5px solid rgba(84,22,29,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '12px',
    }}>
      <p style={{
        fontFamily: "'Cinzel', serif", fontSize: '10px',
        letterSpacing: '1.5px', color: 'rgba(84,22,29,0.45)',
      }}>
        © {new Date().getFullYear()} THEA ENACHE
      </p>
      <div style={{ display: 'flex', gap: '24px' }}>
        {socials.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'Cinzel', serif", fontSize: '10px',
            letterSpacing: '1.5px', color: 'rgba(84,22,29,0.45)',
            transition: 'color 0.18s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={e => e.target.style.color = '#54161D'}
          onMouseLeave={e => e.target.style.color = 'rgba(84,22,29,0.45)'}
          >
            {s.label.toUpperCase()}
          </a>
        ))}
      </div>
    </footer>
  );
}

export function MinimalFooter() {
  return (
    <footer style={{
      padding: '20px calc(var(--border-width) + 24px)',
      borderTop: '0.5px solid rgba(84,22,29,0.1)',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: "'Cinzel', serif", fontSize: '10px',
        letterSpacing: '1.5px', color: 'rgba(84,22,29,0.35)',
      }}>
        © {new Date().getFullYear()} THEA ENACHE
      </p>
    </footer>
  );
}
