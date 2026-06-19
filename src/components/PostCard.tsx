import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-zinc-100 dark:border-zinc-800 pb-8 mb-8 last:border-0 last:mb-0">
      <time
        dateTime={post.date}
        className="text-xs text-zinc-400 dark:text-zinc-500 font-mono"
      >
        {formatDate(post.date)}
      </time>
      <h2 className="mt-1">
        <Link
          href={`/posts/${post.slug}`}
          className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      {post.excerpt && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      )}
      <Link
        href={`/posts/${post.slug}`}
        className="inline-block mt-3 text-xs font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
      >
        阅读更多 &rarr;
      </Link>
    </article>
  );
}
