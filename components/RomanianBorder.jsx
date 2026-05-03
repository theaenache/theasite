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
      <div style={{ ...borderStyle, left: 0 }} />
      <div style={{ ...borderStyle, right: 0, transform: 'scaleX(-1)' }} />
    </>
  );
}