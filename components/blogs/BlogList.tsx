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
  const [columns, setColumns] = useState(3);
  const [layout] = useQueryState("layout", {
    defaultValue: "grid",
    parse: (value): "grid" | "list" => (value === "list" ? "list" : "grid"),
  });

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  if (layout === "list") {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-2"
      >
        {posts.map((post) => (
          <BlogListItem key={post.id} post={post} />
        ))}
      </motion.div>
    );
  }

  const columnPosts = Array.from({ length: columns }, (_, i) =>
    posts.filter((_, index) => index % columns === i)
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {columnPosts.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          {column.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ))}
    </motion.div>
  );
}
