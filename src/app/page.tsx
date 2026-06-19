import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          LokiTank&apos;s Blog
        </h1>
        <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400 max-w-[65ch] leading-relaxed">
          studIn SDU &middot; 集成电路/微电子方向 &middot; C语言学习中
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          This is a blog site created by me! There are still many things to learn, refueling together!
        </p>
      </section>

      {/* Post list */}
      <section>
        {posts.length === 0 && (
          <p className="text-zinc-400 dark:text-zinc-500 text-sm">
            还没有文章，稍后再来看看吧。
          </p>
        )}
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </>
  );
}
