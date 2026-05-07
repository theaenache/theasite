import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MinimalFooter } from '@/components/Footer';
import Link from 'next/link';

function getPost(slug) {
  const filepath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
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
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, s => `<ul>${s}</ul>`)
    .split(/\n\n+/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.match(/^<(h[123]|ul|ol|blockquote|hr|img|a)/)) return block;
      if (block.startsWith('<img')) return block;
      return `<p>${block.replace(/  \n/g, '<br/>').replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return (
    <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)' }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#54161D', marginBottom: '24px' }}>Post not found.</p>
      <Link href="/blog" style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '2px', color: '#54161D', textDecoration: 'none' }}>← BACK TO BLOG</Link>
    </div>
  );

  return (
    <>
      <style>{`
        .post-body h2 { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 500; color: #54161D; margin: 2.5rem 0 1rem; line-height: 1.2; }
        .post-body h3 { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500; color: #54161D; margin: 2rem 0 0.75rem; }
        .post-body p { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 16px; line-height: 1.85; color: rgba(84,22,29,0.85); margin-bottom: 1.5rem; }
        .post-body ul, .post-body ol { padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .post-body li { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 16px; line-height: 1.8; color: rgba(84,22,29,0.85); margin-bottom: 0.4rem; }
        .post-body strong { font-weight: 500; color: #54161D; }
        .post-body em { font-style: italic; }
        .post-body blockquote { border-left: 2px solid #54161D; padding-left: 1.5rem; margin: 2rem 0; }
        .post-body blockquote p { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: rgba(84,22,29,0.7); }
        .post-body hr { border: none; border-top: 0.5px solid rgba(84,22,29,0.15); margin: 3rem 0; }
        .post-body a { color: #54161D; border-bottom: 0.5px solid rgba(84,22,29,0.4); text-decoration: none; }
        .post-body a:hover { border-bottom-color: #54161D; }
        .post-body img { width: 100%; height: auto; margin: 2rem 0; display: block; }
        .post-body br { line-height: 1.85; }
      `}</style>

      <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)', maxWidth: '720px', margin: '0 auto' }}>
        <Link href="/blog" style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '2px', color: 'rgba(84,22,29,0.5)', textDecoration: 'none', display: 'inline-block', marginBottom: '48px' }}>
          ← BLOG
        </Link>

        {post.cover && (
          <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', marginBottom: '48px' }}>
            <img src={post.cover} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
        )}

        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '2px', color: 'rgba(84,22,29,0.45)', marginBottom: '16px' }}>
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '400', color: '#54161D', lineHeight: '1.15', marginBottom: '40px' }}>
          {post.title}
        </h1>

        <div style={{ borderTop: '0.5px solid rgba(84,22,29,0.15)', marginBottom: '40px' }}/>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}/>
      </div>
      <MinimalFooter />
    </>
  );
}