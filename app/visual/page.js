import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MinimalFooter } from '@/components/Footer';

function getAlbums() {
  const dir = path.join(process.cwd(), 'content/visual');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(raw);
      return { slug: filename.replace('.md', ''), ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function VisualPage() {
  const albums = getAlbums();

  return (
    <>
      <style>{`
        .album-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          display: block;
          aspect-ratio: 1/1;
        }
        .album-cover {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.4s ease;
          opacity: 0;
          z-index: 1;
        }
        .album-sketch {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.4s ease;
          opacity: 1;
          z-index: 2;
        }
        .album-card:hover .album-sketch {
          opacity: 0;
        }
        .album-card:hover .album-cover {
          opacity: 1;
        }
        .album-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(84,22,29,0.75) 0%, transparent 100%);
          z-index: 3;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .album-card:hover .album-info {
          opacity: 1;
          transform: translateY(0);
        }
        .album-placeholder {
          position: absolute;
          inset: 0;
          background: rgba(84,22,29,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
      `}</style>

      <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)' }}>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: '11px',
          letterSpacing: '3px', color: 'rgba(84,22,29,0.5)',
          marginBottom: '48px',
        }}>
          VISUAL
        </p>

        {albums.length === 0 ? (
          <p style={{ color: 'rgba(84,22,29,0.4)', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>
            Albums coming soon.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {albums.map(album => (
              <Link key={album.slug} href={`/visual/${album.slug}`} className="album-card">
                {/* Cover photo underneath — revealed on hover */}
                {album.cover ? (
                  <img src={album.cover} alt={album.title} className="album-cover"/>
                ) : (
                  <div className="album-placeholder">
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '1.5px', color: 'rgba(84,22,29,0.3)' }}>
                      {album.title?.toUpperCase()}
                    </p>
                  </div>
                )}
                {/* Sketch overlay on top — fades out on hover */}
                {album.sketch && (
                  <img src={album.sketch} alt="" className="album-sketch"/>
                )}
                {/* Info revealed on hover */}
                <div className="album-info">
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '1.5px', color: 'rgba(255,251,240,0.6)', marginBottom: '4px' }}>
                    {album.tag?.toUpperCase()}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#FFFBF0', fontWeight: '400' }}>
                    {album.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <MinimalFooter />
    </>
  );
}