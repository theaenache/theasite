'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HamburgerMenu from './HamburgerMenu';


export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 calc(var(--border-width) + 20px)',
      zIndex: 51,
      background: 'rgba(255,251,240,0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '0.5px solid rgba(84,22,29,0.1)',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <img src="/logoheader.png" alt="Thea Enache" style={{ height: '48px', width: 'auto' }} />
        {isHome && (
          <span style={{
            fontFamily: "'Vilaka', serif",
            fontSize: '14px',
            letterSpacing: '1px',
            color: '#54161D',
            fontWeight: '400',
          }}>
            
          </span>
        )}
      </Link>

      <HamburgerMenu />
    </header>
  );
}
