"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
  coverImage?: string;
  tags: string[];
}

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <motion.div
      variants={item}
      className={cn(
        "group relative cursor-pointer transition-all duration-500",
        "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-purple-600/20 before:to-blue-600/20 before:opacity-0 before:transition-opacity hover:before:opacity-100",
        "after:absolute after:inset-0 after:rounded-xl after:shadow-[0_0_15px_rgba(139,92,246,0.3)] after:opacity-0 after:transition-opacity hover:after:opacity-100",
        className
      )}
    >
      <Link
        href={`/blogs/${post.slug}`}
        className="block overflow-hidden rounded-xl bg-zinc-900/40"
      >
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={post.coverImage ?? ""}
              alt={post.title}
              width={800}
              height={600}
              className="w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              <p className="text-sm font-medium text-purple-300">
                {post.tags[0]}
              </p>
            </div>
            <h2 className="text-xl font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-purple-300">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {post.readingTime} • {post.date}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
