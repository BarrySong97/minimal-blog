"use client";

import { FC, useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence, useInView } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Book, Media } from "@/payload-types";
import {
  JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { CustomUploadComponent } from "../photo/detail/PhotoMeta";

interface BookScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  books: Book[];
}
const jsxConverters: (args: {
  toc?: boolean;
}) => JSXConvertersFunction<DefaultNodeTypes> =
  () =>
  ({ defaultConverters }) => {
    return {
      ...defaultConverters,
      upload: ({ node }) => {
        return <CustomUploadComponent node={node} />;
      },
    };
  };

const BookScroller: FC<BookScrollerProps> = ({
  books,
  className,
  ...props
}) => {
  const [activeBookIndex, setActiveBookIndex] = useState(0);
  const [previousActiveIndex, setPreviousActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Track which books have already been revealed
  const [revealedBooks, setRevealedBooks] = useState<Record<string, boolean>>(
    {}
  );

  // Track scroll position
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Update active book based on scroll position
  useEffect(() => {
    if (!containerRef.current) return;

    // Function to check which book is most visible in the viewport
    const updateActiveBook = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestBook = 0;
      let closestDistance = Infinity;

      bookRefs.current.forEach((bookRef, index) => {
        if (!bookRef) return;

        const bookRect = bookRef.getBoundingClientRect();
        const bookCenter = bookRect.top + bookRect.height / 2;
        const distance = Math.abs(containerCenter - bookCenter);

        // Check if this book is significantly visible in the viewport
        const isVisible =
          bookRect.top < containerRect.bottom - containerRect.height * 0.3 &&
          bookRect.bottom > containerRect.top + containerRect.height * 0.3;

        // If book is visible and not yet revealed, trigger reveal
        const bookId = books[index]?.id;
        if (isVisible && bookId && !revealedBooks[bookId]) {
          setRevealedBooks((prev) => ({
            ...prev,
            [bookId]: true,
          }));
        }

        if (distance < closestDistance) {
          closestDistance = distance;
          closestBook = index;
        }
      });

      if (closestBook !== activeBookIndex) {
        setPreviousActiveIndex(activeBookIndex);
        setActiveBookIndex(closestBook);
      }
    };

    // Add scroll event listener
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateActiveBook);
    }

    // Initial check
    updateActiveBook();

    // Cleanup
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", updateActiveBook);
      }
    };
  }, [activeBookIndex, books, revealedBooks]);

  // Handle image load complete
  const handleImageLoad = (bookId: number) => {
    // If this is the first image and hasn't been revealed yet, mark it for reveal
    if (bookId === books[0]?.id && !revealedBooks[bookId]) {
      setRevealedBooks((prev) => ({
        ...prev,
        [bookId]: true,
      }));
    }
  };

  return (
    <div className={cn("flex w-full gap-6", className)} {...props}>
      {/* Left panel - Book info */}
      <div className="absolute top-0 w-1/4 p-6 flex flex-col justify-center h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={books[activeBookIndex]?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">
              {books[activeBookIndex]?.title}
            </h2>
            <p className="text-gray-600">{books[activeBookIndex]?.author}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-1/4"></div>

      {/* Center panel - Book covers */}
      <div
        ref={containerRef}
        className="w-1/2 min-h-screen h-screen flex flex-col items-center pb-16 overflow-y-scroll scrollbar-hide space-y-24"
      >
        {books.map((book, index) => {
          const isRevealed = revealedBooks[book.id];

          return (
            <div
              key={book.id}
              ref={(el) => {
                bookRefs.current[index] = el;
              }}
              className={cn(
                "w-[70%] aspect-[3/4] min-h-[calc(100vh-4rem)] overflow-hidden relative"
              )}
            >
              <div className="w-full h-full relative ">
                <motion.div className="w-full h-full relative ">
                  <Image
                    src={(book.image as Media)?.url!}
                    alt={`${book.title} by ${book.author}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    className="object-cover"
                    onLoadingComplete={() => handleImageLoad(book.id)}
                  />
                  {/* Curtain effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ y: 0 }}
                    animate={{ y: isRevealed ? "-100%" : 0 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.6, 0.01, 0.05, 0.95],
                      delay: 0.1,
                    }}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-1/4"></div>

      {/* Right panel - Book notes */}
      <div className="absolute top-0 right-0 w-1/4 p-6 flex flex-col justify-center h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={books[activeBookIndex]?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-800 leading-relaxed italic">
              <RichText
                converters={jsxConverters({})}
                data={books[activeBookIndex]?.note as unknown as any}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookScroller;
