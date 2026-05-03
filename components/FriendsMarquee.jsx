'use client';


const friends = [
  { name: 'Cam',    href: 'https://cameron-lee.com', icon: '/friends/cam.gif' },
  { name: 'Camden', href: 'https://www.camdenmho.com/', icon: '/friends/camden.gif' },
  { name: 'Bobby',  href: 'https://bobbyyf.github.io/', icon: '/friends/bobby.gif' },
  { name: 'Francis', href: 'https://francissanb.github.io/', icon: '/friends/francis.png' },
  { name: 'Jason', href: 'https://jasonheflinger.com/', icon: '/friends/jason.gif' },
  { name: 'Jia',  href: 'https://jia-s-personal-portfolio.vercel.app/', icon: '/friends/jia.png' },
  { name: 'Justin',  href: 'https://neonetizen.net/', icon: '/friends/justin.png' },
];

/* duplicated list so the marquee loops seamlessly */
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
      {/* keyframe animation injected via style tag */}
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
          gap: 10px;
          opacity: 0.65;
          transition: opacity 0.2s ease;
          cursor: pointer;
          text-decoration: none;
          color: #54161D;
          position: relative;
        }
        .friend-item:hover {
          opacity: 1;
        }
        .friend-item img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 0.5px solid rgba(84,22,29,0.2);
        }
        .friend-item .friend-placeholder {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(84,22,29,0.1);
          border: 0.5px solid rgba(84,22,29,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          color: rgba(84,22,29,0.6);
        }
        .friend-item .friend-name {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 1.5px;
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
              <img src={friend.icon} alt={friend.name} style={{ height: '31px', width: 'auto', display: 'block' }} />
              <span className="friend-name">{friend.name.toUpperCase()}</span>
            </a>
            <span className="marquee-divider" aria-hidden="true"/>
          </div>
        ))}
      </div>
    </div>
  );
}
