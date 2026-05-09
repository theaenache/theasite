import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MinimalFooter } from '@/components/Footer';
import Link from 'next/link';
import ScrollZoom from '@/components/ScrollZoom';

function getAlbum(slug) {
  const filepath = path.join(process.cwd(), 'content/visual', `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  return { ...data, content };
}

function parseAlbumContent(content) {
  const blocks = [];
  const lines = content.trim().split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith('![')) {
      const imgMatch = line.match(/!\[(.+?)\]\((.+?)\)/);
      if (imgMatch) {
        const caption = imgMatch[1];
        const src = imgMatch[2];
        let commentaryParagraphs = [];
        let currentPara = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('![')) {
          const l = lines[i].trim();
          if (l === '') {
            if (currentPara.length > 0) {
              commentaryParagraphs.push(currentPara.join(' '));
              currentPara = [];
            }
          } else {
            currentPara.push(l);
          }
          i++;
        }
        if (currentPara.length > 0) commentaryParagraphs.push(currentPara.join(' '));
        blocks.push({ src, caption, paragraphs: commentaryParagraphs });
      }
    } else {
      i++;
    }
  }
  return blocks;
}

const textStyle = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: '300',
  fontSize: '15px',
  lineHeight: '1.85',
  color: 'rgba(84,22,29,0.8)',
  marginBottom: '1rem',
};

const captionStyle = {
  fontFamily: "'Cinzel', serif",
  fontSize: '9px',
  letterSpacing: '1.5px',
  color: 'rgba(84,22,29,0.35)',
  marginTop: '10px',
};

export default async function AlbumPage({ params }) {
  const { slug } = await params;
  const album = getAlbum(slug);

  if (!album) return (
    <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)' }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#54161D', marginBottom: '24px' }}>Album not found.</p>
      <Link href="/visual" style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '2px', color: '#54161D', textDecoration: 'none' }}>← VISUAL</Link>
    </div>
  );

  const blocks = parseAlbumContent(album.content || '');
  const heroFirst = album.heroImage === true;

  return (
    <>
      <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)', maxWidth: '1000px', margin: '0 auto' }}>

        <Link href="/visual" style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '2px', color: 'rgba(84,22,29,0.5)', textDecoration: 'none', display: 'inline-block', marginBottom: '48px' }}>
          ← VISUAL
        </Link>

        {album.tag && (
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '1.5px', color: '#54161D', border: '0.5px solid rgba(84,22,29,0.3)', padding: '4px 12px', display: 'inline-block', marginBottom: '20px' }}>
            {album.tag.toUpperCase()}
          </span>
        )}

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '400', color: '#54161D', lineHeight: '1.15', marginBottom: '16px' }}>
          {album.title}
        </h1>

        {album.location && (
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '2px', color: 'rgba(84,22,29,0.45)', marginBottom: '48px' }}>
            {album.location} · {album.date}
          </p>
        )}

        <div style={{ borderTop: '0.5px solid rgba(84,22,29,0.15)', marginBottom: '64px' }}/>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {blocks.map((block, i) => {

            /* Hero block — full width image, text below */
            if (heroFirst && i === 0) {
              return (
                <div key={i}>
                  <ScrollZoom subtle={true} style={{ width: '100%', marginBottom: '32px' }}>
                    <img src={block.src} alt={block.caption} style={{ width: '100%', height: 'auto', display: 'block' }}/>
                    {block.caption && <p style={captionStyle}>{block.caption}</p>}
                  </ScrollZoom>
                  <div style={{ maxWidth: '680px' }}>
                    {(block.paragraphs || []).map((para, pi) => (
                      <p key={pi} style={textStyle}>{para}</p>
                    ))}
                  </div>
                </div>
              );
            }

            /* Alternating layout */
            const isEven = heroFirst ? (i % 2 === 1) : (i % 2 === 0);

            return (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: isEven ? '1.2fr 1fr' : '1fr 1.2fr',
                gap: '48px',
                alignItems: 'center',
              }}>
                {isEven ? (
                  <>
                    <ScrollZoom style={{ overflow: 'hidden' }}>
                      <img src={block.src} alt={block.caption} style={{ width: '100%', height: 'auto', display: 'block' }}/>
                      {block.caption && <p style={captionStyle}>{block.caption}</p>}
                    </ScrollZoom>
                    <div>
                      {(block.paragraphs || []).map((para, pi) => (
                        <p key={pi} style={textStyle}>{para}</p>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      {(block.paragraphs || []).map((para, pi) => (
                        <p key={pi} style={textStyle}>{para}</p>
                      ))}
                    </div>
                    <ScrollZoom style={{ overflow: 'hidden' }}>
                      <img src={block.src} alt={block.caption} style={{ width: '100%', height: 'auto', display: 'block' }}/>
                      {block.caption && <p style={captionStyle}>{block.caption}</p>}
                    </ScrollZoom>
                  </>
                )}
              </div>
            );
          })}
        </div>

      </div>
      <MinimalFooter />
    </>
  );
}