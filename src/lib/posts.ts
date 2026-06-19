import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
}

export interface Post extends PostMeta {
  content: string;
}

function parseDate(dateStr: string): Date {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir);
  const posts = files
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(postsDir, f), "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title || f.replace(/\.md$/, ""),
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
        slug: data.slug || f.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
        excerpt: data.excerpt || "",
      };
    })
    .filter((p) => p.title);

  return posts.sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(postsDir)) return null;

  const files = fs.readdirSync(postsDir);
  for (const f of files) {
    if (!f.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(postsDir, f), "utf-8");
    const { data, content } = matter(raw);
    const postSlug = data.slug || f.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
    if (postSlug === slug) {
      return {
        title: data.title || "",
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
        slug: postSlug,
        excerpt: data.excerpt || "",
        content,
      };
    }
  }
  return null;
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
