import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "页面未找到",
};

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold text-zinc-200 dark:text-zinc-800">
        404
      </h1>
      <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400">
        页面未找到，可能已被移除或链接有误。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
      >
        &larr; 回到首页
      </Link>
    </div>
  );
}
