'use client';

const friends = [
  { name: 'Cam',     href: 'https://cameron-lee.com',                        icon: '/friends/cam.gif' },
  { name: 'Camden',  href: 'https://www.camdenmho.com/',                      icon: '/friends/camden.gif' },
  { name: 'Bobby',   href: 'https://bobbyyf.github.io/',                      icon: '/friends/bobby.gif' },
  { name: 'Francis', href: 'https://francissanb.github.io/',                  icon: '/friends/francis.png' },
  { name: 'Jason',   href: 'https://jasonheflinger.com/',                     icon: '/friends/jason.gif' },
  { name: 'Jia',     href: 'https://jia-s-personal-portfolio.vercel.app/',    icon: '/friends/jia.png' },
  { name: 'Justin',  href: 'https://neonetizen.net/',                         icon: '/friends/justin.png' },
];

const doubled = [...friends, ...friends];

export default function FriendsMarquee() {
  return (
    <div style={{
      width: '100%',
      borderTop: '0.5px solid rgba(84,22,29,0.15)',
      borderBottom: '0.5px solid rgba(84,22,29,0.15)',
      background: 'rgba(84,22,29,0.03)',
      padding: '18px 0',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 40px;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .friend-item {
          display: flex;
          align-items: center;
          opacity: 0.65;
          transition: opacity 0.2s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .friend-item:hover {
          opacity: 1;
        }
        .friend-item img {
          display: block;
          height: 36px;
          width: auto;
          object-fit: cover;
          border: 0.5px solid rgba(84,22,29,0.2);
        }
        .marquee-divider {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(84,22,29,0.3);
          flex-shrink: 0;
        }
      `}</style>

      <div className="marquee-track">
        {doubled.map((friend, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <a
              href={friend.href}
              target="_blank"
              rel="noopener noreferrer"
              className="friend-item"
              title={friend.name}
            >
              <img src={friend.icon} alt={friend.name} />
            </a>
            <span className="marquee-divider" aria-hidden="true"/>
          </div>
        ))}
      </div>
    </div>
  );
}