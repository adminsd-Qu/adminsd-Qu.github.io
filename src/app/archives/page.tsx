import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "归档",
};

export default function ArchivesPage() {
  const posts = getAllPosts();

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
        归档
      </h1>

      {posts.length === 0 && (
        <p className="text-zinc-400 dark:text-zinc-500 text-sm">
          还没有文章。
        </p>
      )}

      {/* Group by year */}
      {(() => {
        const years = new Map<string, typeof posts>();
        for (const post of posts) {
          const year = post.date.slice(0, 4);
          const existing = years.get(year) || [];
          existing.push(post);
          years.set(year, existing);
        }

        return Array.from(years.entries())
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, yearPosts]) => (
            <section key={year} className="mb-10">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
                {year}
              </h2>
              <ul className="space-y-2">
                {yearPosts.map((post) => (
                  <li key={post.slug} className="flex items-baseline gap-3">
                    <time className="text-xs text-zinc-400 dark:text-zinc-500 font-mono shrink-0 w-16">
                      {post.date.slice(5)}
                    </time>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ));
      })()}
    </>
  );
}
