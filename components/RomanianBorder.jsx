'use client';

const borderStyle = {
  position: 'fixed',
  top: 0,
  width: 'var(--border-width)',
  height: '100vh',
  zIndex: 50,
  pointerEvents: 'none',
  background: '#FFFBF0 url(/border.png) repeat-y top / 100% auto',
};

export default function RomanianBorder() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .romanian-border { display: none !important; }
        }
      `}</style>
      <div className="romanian-border" style={{ ...borderStyle, left: 0 }} />
      <div className="romanian-border" style={{ ...borderStyle, right: 0, transform: 'scaleX(-1)' }} />
    </>
  );
}