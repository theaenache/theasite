import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MinimalFooter } from '@/components/Footer';
import IntakeGrid from '@/components/IntakeGrid';

function getEntries() {
  const dir = path.join(process.cwd(), 'content/intake');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data, content } = matter(raw);
      return { slug: filename.replace('.md', ''), ...data, content: content.trim() };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default async function IntakePage({ searchParams }) {
  const entries = getEntries();
  const { category, open } = await searchParams;

  return (
    <>
      <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)' }}>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: '11px',
          letterSpacing: '3px', color: 'rgba(84,22,29,0.5)',
          marginBottom: '16px',
        }}>
          INTAKE
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
          fontSize: '18px', color: 'rgba(84,22,29,0.6)',
          marginBottom: '48px', maxWidth: '560px',
        }}>
          We are, in no small part, made of what we take in. This is a small corner for the things I've consumed and what I have made of them.
        </p>

        {entries.length === 0 ? (
          <p style={{ color: 'rgba(84,22,29,0.4)', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>
            Nothing logged yet.
          </p>
        ) : (
          <IntakeGrid items={entries} initialCategory={category} initialOpenSlug={open} />
        )}
      </div>
      <MinimalFooter />
    </>
  );
}
