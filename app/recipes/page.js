import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MinimalFooter } from '@/components/Footer';

function getRecipes() {
  const dir = path.join(process.cwd(), 'content/recipes');
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

export default function RecipesPage() {
  const recipes = getRecipes();

  return (
    <>
      <style>{`
        .recipe-card {
          border: 0.5px solid rgba(84,22,29,0.15);
          transition: border-color 0.2s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .recipe-card:hover { border-color: rgba(84,22,29,0.45); }
      `}</style>

      <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)' }}>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: '11px',
          letterSpacing: '3px', color: 'rgba(84,22,29,0.5)',
          marginBottom: '48px',
        }}>
          RECIPES
        </p>

        {recipes.length === 0 ? (
          <p style={{ color: 'rgba(84,22,29,0.4)', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>
            Recipes coming soon.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px',
          }}>
            {recipes.map(recipe => (
              <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className="recipe-card">
                <div style={{
                  width: '100%', aspectRatio: '16/9',
                  background: 'rgba(84,22,29,0.08)', overflow: 'hidden',
                }}>
                  {recipe.cover && (
                    <img src={recipe.cover} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <p style={{
                      fontFamily: "'Cinzel', serif", fontSize: '10px',
                      letterSpacing: '1.5px', color: 'rgba(84,22,29,0.45)',
                    }}>
                      {new Date(recipe.date).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}
                    </p>
                    {recipe.cuisine && (
                      <span style={{
                        fontFamily: "'Cinzel', serif", fontSize: '9px',
                        letterSpacing: '1px', color: '#54161D',
                        border: '0.5px solid rgba(84,22,29,0.3)',
                        padding: '3px 8px',
                      }}>
                        {recipe.cuisine.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px', fontWeight: '500',
                    color: '#54161D', marginBottom: '10px', lineHeight: '1.3',
                  }}>
                    {recipe.title}
                  </h2>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: '300',
                    fontSize: '13px', color: 'rgba(84,22,29,0.65)', lineHeight: '1.65',
                  }}>
                    {recipe.excerpt}
                  </p>
                  {(recipe.cookTime || recipe.servings) && (
                    <div style={{ display: 'flex', gap: '16px', marginTop: '14px' }}>
                      {recipe.cookTime && (
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(84,22,29,0.5)' }}>
                          ⏱ {recipe.cookTime}
                        </p>
                      )}
                      {recipe.servings && (
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(84,22,29,0.5)' }}>
                          ◯ {recipe.servings} servings
                        </p>
                      )}
                    </div>
                  )}
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