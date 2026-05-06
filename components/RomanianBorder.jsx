'use client';

export default function RomanianBorder() {
  return (
    <>
      <style>{`
        .romanian-border {
          position: fixed;
          top: 0;
          width: 38px;
          height: 100vh;
          z-index: 50;
          pointer-events: none;
          background: #FFFBF0 url(/border.png) repeat-y top / 100% auto;
        }
        .romanian-border-left { left: 0; }
        .romanian-border-right { right: 0; transform: scaleX(-1); }
      `}</style>
      <div className="romanian-border romanian-border-left" />
      <div className="romanian-border romanian-border-right" />
    </>
  );
}