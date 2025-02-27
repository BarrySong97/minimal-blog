"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Icon
          icon="solar:sad-square-linear"
          className="w-32 h-32 mx-auto text-gray-400"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
      >
        Page not found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-md mx-auto text-gray-600 dark:text-gray-400 mb-8"
      >
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or deleted.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
            "bg-gray-900 text-white hover:bg-gray-800",
            "dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
            "transition-colors duration-200 font-medium"
          )}
        >
          <Icon icon="solar:home-2-linear" className="w-5 h-5" />
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
