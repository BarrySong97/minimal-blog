"use client";

import { motion } from "framer-motion";
import { BlogCard, type BlogPost } from "./BlogCard";
import { BlogListItem } from "./BlogListItem";
import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";

interface BlogListProps {
  posts: BlogPost[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function BlogList({ posts }: BlogListProps) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {posts.map((post) => (
        <BlogListItem key={post.id} post={post} />
      ))}
    </motion.div>
  );
}
