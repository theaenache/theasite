import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { projects } from './projects';

function readContentDir(dir) {
  const full = path.join(process.cwd(), dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(full, filename), 'utf8');
      const { data } = matter(raw);
      return { slug: filename.replace('.md', ''), ...data };
    });
}

export function getSearchIndex() {
  const index = [];

  for (const post of readContentDir('content/blog')) {
    if (post.tag) index.push({ keyword: post.tag, label: post.title, href: `/blog/${post.slug}` });
  }

  for (const album of readContentDir('content/visual')) {
    if (album.tag) index.push({ keyword: album.tag, label: album.title, href: `/visual/${album.slug}` });
    if (album.visualTag) index.push({ keyword: album.visualTag, label: album.title, href: `/visual/${album.slug}` });
  }

  for (const item of readContentDir('content/intake')) {
    if (item.category) {
      index.push({
        keyword: item.category,
        label: item.title,
        href: `/intake?category=${encodeURIComponent(item.category)}&open=${item.slug}`,
      });
    }
  }

  for (const project of projects) {
    for (const tag of project.tags || []) {
      index.push({ keyword: tag, label: project.title, href: `/projects?open=${project.id}` });
    }
  }

  return index;
}
