import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MinimalFooter } from '@/components/Footer';
import Link from 'next/link';

function getRecipe(slug) {
  const filepath = path.join(process.cwd(), 'content/recipes', `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  return { ...data, content };
}

function markdownToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, s => `<ul>${s}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .split(/\n\n+/)
    .map(block => {
      if (block.match(/^<(h[123]|ul|ol|blockquote|hr)/)) return block;
      if (block.trim() === '') return '';
      return `<p>${block.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');
}

export default function RecipePage({ params }) {
  const recipe = getRecipe(params.slug);

  if (!recipe) return (
    <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)' }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#54161D', marginBottom: '24px' }}>Recipe not found.</p>
      <Link href="/recipes" style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '2px', color: '#54161D', textDecoration: 'none' }}>← BACK TO RECIPES</Link>
    </div>
  );

  return (
    <>
      <style>{`
        .recipe-body h2 { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 500; color: #54161D; margin: 2.5rem 0 1rem; padding-bottom: 8px; border-bottom: 0.5px solid rgba(84,22,29,0.15); }
        .recipe-body h3 { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 500; color: #54161D; margin: 2rem 0 0.75rem; }
        .recipe-body p { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 16px; line-height: 1.85; color: rgba(84,22,29,0.85); margin-bottom: 1.25rem; }
        .recipe-body ul { list-style: none; padding: 0; margin-bottom: 1.5rem; }
        .recipe-body ul li { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 15px; line-height: 1.8; color: rgba(84,22,29,0.85); padding: 8px 0; border-bottom: 0.5px solid rgba(84,22,29,0.08); }
        .recipe-body ul li::before { content: '—'; margin-right: 10px; color: rgba(84,22,29,0.35); }
        .recipe-body ol { padding-left: 0; margin-bottom: 1.5rem; counter-reset: step; list-style: none; }
        .recipe-body ol li { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 15px; line-height: 1.8; color: rgba(84,22,29,0.85); padding: 12px 0 12px 40px; border-bottom: 0.5px solid rgba(84,22,29,0.08); position: relative; counter-increment: step; }
        .recipe-body ol li::before { content: counter(step); position: absolute; left: 0; top: 12px; font-family: 'Cinzel', serif; font-size: 11px; color: rgba(84,22,29,0.4); }
        .recipe-body strong { font-weight: 500; color: #54161D; }
      `}</style>

      <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)', maxWidth: '720px', margin: '0 auto' }}>

        <Link href="/recipes" style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '2px', color: 'rgba(84,22,29,0.5)', textDecoration: 'none', display: 'inline-block', marginBottom: '48px' }}>
          ← RECIPES
        </Link>

        {recipe.cover && (
          <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', marginBottom: '48px' }}>
            <img src={recipe.cover} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
        )}

        {/* Cuisine tag */}
        {recipe.cuisine && (
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '1.5px', color: '#54161D', border: '0.5px solid rgba(84,22,29,0.3)', padding: '4px 12px', display: 'inline-block', marginBottom: '20px' }}>
            {recipe.cuisine.toUpperCase()}
          </span>
        )}

        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '2px', color: 'rgba(84,22,29,0.45)', marginBottom: '16px' }}>
          {new Date(recipe.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '400', color: '#54161D', lineHeight: '1.15', marginBottom: '32px' }}>
          {recipe.title}
        </h1>

        {/* Meta row: cook time + servings */}
        {(recipe.cookTime || recipe.servings) && (
          <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', padding: '20px 0', borderTop: '0.5px solid rgba(84,22,29,0.15)', borderBottom: '0.5px solid rgba(84,22,29,0.15)' }}>
            {recipe.cookTime && (
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '1.5px', color: 'rgba(84,22,29,0.4)', marginBottom: '4px' }}>COOK TIME</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#54161D', margin: 0 }}>{recipe.cookTime}</p>
              </div>
            )}
            {recipe.servings && (
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '1.5px', color: 'rgba(84,22,29,0.4)', marginBottom: '4px' }}>SERVINGS</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#54161D', margin: 0 }}>{recipe.servings}</p>
              </div>
            )}
          </div>
        )}

        {/* Story behind the dish */}
        {recipe.story && (
          <div style={{ marginBottom: '48px', padding: '28px', background: 'rgba(84,22,29,0.04)', borderLeft: '2px solid #54161D' }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '2px', color: 'rgba(84,22,29,0.45)', marginBottom: '12px' }}>THE STORY</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontStyle: 'italic', color: 'rgba(84,22,29,0.8)', lineHeight: '1.75', margin: 0 }}>
              {recipe.story}
            </p>
          </div>
        )}

        {/* Recipe body (ingredients + steps from markdown) */}
        <div className="recipe-body" dangerouslySetInnerHTML={{ __html: markdownToHtml(recipe.content) }}/>

      </div>
      <MinimalFooter />
    </>
  );
}