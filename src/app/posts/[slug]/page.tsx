import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAdjacentPosts, getAllPosts, formatDate } from "@/lib/posts";
import { PostContent } from "@/components/PostContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <article>
      {/* Header */}
      <header className="mb-10">
        <time
          dateTime={post.date}
          className="text-xs text-zinc-400 dark:text-zinc-500 font-mono"
        >
          {formatDate(post.date)}
        </time>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {post.title}
        </h1>
      </header>

      {/* Content */}
      <PostContent content={post.content} />

      {/* Navigation */}
      <nav className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between gap-4">
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="group flex-1"
          >
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
              &larr; 上一篇
            </span>
            <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="group flex-1 text-right"
          >
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
              下一篇 &rarr;
            </span>
            <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {next.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </article>
  );
}
