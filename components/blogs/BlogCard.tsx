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
        "group cursor-pointer transition-transform duration-500 hover:scale-[1.02]",
        className
      )}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-md">
          <div className="relative w-full">
            <Image
              src={post.coverImage ?? ""}
              alt={post.title}
              width={800}
              height={600}
              className="w-full transition-transform duration-500 will-change-transform group-hover:scale-105"
              style={{ height: "auto" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
              <p className="text-sm font-medium text-white/80">
                • {post.tags[0]}
              </p>
              <h2 className="text-lg font-medium leading-tight tracking-tight">
                {post.title}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
