"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import Link from "next/link";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label={open ? "关闭菜单" : "打开菜单"}
      >
        {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setOpen(false)}
          />
          {/* Menu panel */}
          <nav className="fixed top-0 right-0 h-full w-56 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-xl z-50 p-6 flex flex-col gap-4">
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="关闭菜单"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium"
            >
              首页
            </Link>
            <Link
              href="/archives"
              onClick={() => setOpen(false)}
              className="text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium"
            >
              归档
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}
