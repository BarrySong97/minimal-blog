"use client";
import { ProcessedHeading } from "@/components/common/richtext/get-headings";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { FC, useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { homeService } from "@/service/home";
import { Media } from "@/payload-types";
import { AnimatePresence, motion } from "framer-motion";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export interface MobileTocProps {
  headings: ProcessedHeading[];
  className?: string;
}

const MobileToc: FC<MobileTocProps> = ({ headings, className }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string>("");
  const [clickedId, setClickedId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const drawerRef = useRef<HTMLDivElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);

  const { data: home } = useQuery({
    queryKey: queryKeys.home,
    queryFn: () => homeService.getHome(),
    staleTime: Infinity,
  });

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;

      // Handle edge cases - ensure progress is 0 when at the top and 100 when at the bottom
      let progress = 0;
      if (documentHeight > 0) {
        progress = Math.min(
          Math.max(Math.round((scrollTop / documentHeight) * 100), 0),
          100
        );
      }

      // If we're very close to the bottom, set to 100%
      if (documentHeight > 0 && documentHeight - scrollTop < 5) {
        progress = 100;
      }

      // If we're at the very top, ensure progress is 0
      if (scrollTop <= 0) {
        progress = 0;
      }

      setScrollProgress(progress);

      // Update the progress circle
      if (progressCircleRef.current) {
        const radius = 20;
        const circumference = 2 * Math.PI * radius;

        // 确保精确计算小百分比的偏移量
        const offset =
          progress === 0
            ? circumference // 当进度为0时，完全隐藏圆环
            : circumference - (progress / 100) * circumference;

        progressCircleRef.current.style.strokeDashoffset = `${offset}`;
        progressCircleRef.current.style.opacity = progress === 0 ? "0" : "1";
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize progress

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Observe headings for intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only update activeId when not in clicked state
            if (!clickedId) {
              setActiveId(entry.target.id);
            }
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.anchor);
      if (element) observer.observe(element);
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.anchor);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings, clickedId]);

  // Decide which ID to use for updating indicator position
  const currentId = hoveredId || clickedId || activeId;

  // Update indicator position when the current ID changes
  useEffect(() => {
    if (isOpen) {
      updateIndicatorPosition(currentId);
    }
  }, [currentId, isOpen]);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const updateIndicatorPosition = (id: string) => {
    if (!id || !indicatorRef.current || !navRef.current) return;

    const headingElement = headingRefs.current.get(id);
    if (!headingElement) return;

    const navRect = navRef.current.getBoundingClientRect();
    const headingRect = headingElement.getBoundingClientRect();

    // Calculate relative position
    const top = headingRect.top - navRect.top;
    const height = headingRect.height - 10;

    // Apply position to indicator
    indicatorRef.current.style.transform = `translateY(${top + 4}px)`;
    indicatorRef.current.style.height = `${height}px`;
    indicatorRef.current.style.opacity = "1";
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // Set clicked ID
    setClickedId(id);

    // Close the drawer
    setIsOpen(false);

    // Scroll to the heading
    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Update URL without triggering navigation
    window.history.pushState({}, "", `${pathname}#${id}`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsOpen(false);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // SVG circle properties
  const circleSize = 48; // Size of the button
  const strokeWidth = 2;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      {/* Floating TOC button with circular progress */}
      <button
        onClick={toggleDrawer}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center",
          "w-12 h-12 rounded-full bg-white shadow-lg",
          "text-gray-700 hover:bg-gray-50 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-gray-300"
        )}
        aria-label="Toggle table of contents"
      >
        {/* SVG for circular progress */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox={`0 0 ${circleSize} ${circleSize}`}
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            ref={progressCircleRef}
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="#111827"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              scrollProgress === 0
                ? 0
                : circumference - (scrollProgress / 100) * circumference
            }
            className="transition-all duration-300 ease-in-out"
            style={{ opacity: scrollProgress === 0 ? 0 : 1 }}
          />
        </svg>

        {/* Icon */}
        <Icon icon="heroicons:list-bullet" className="w-5 h-5 z-10" />

        {/* Small text indicator for percentage */}
      </button>

      {/* Drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* TOC Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed top-0 right-0 bottom-0 z-50",
              "w-[80%] max-w-[320px] bg-white shadow-xl",
              "flex flex-col"
            )}
          >
            {/* Drawer header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold">目录</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close drawer"
              >
                <Icon icon="heroicons:x-mark" className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Author info */}
              <div className="mb-4 flex items-center gap-3">
                <ImageWithFallback
                  image={home?.avatar as Media}
                  alt="Profile picture"
                  width={96}
                  height={96}
                  priority
                  className={cn(
                    "object-cover w-10 h-10 ",
                    "motion-scale-in-[0.5] motion-opacity-in-[0%] motion-ease-spring-smooth"
                  )}
                />
                <div className="space-y-0.5">
                  <div className="font-medium text-sm">{home?.name}</div>
                  <div className="text-xs text-gray-500">
                    {home?.short_description}
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-gray-200 my-3" />

              {/* TOC navigation */}
              <div className="relative">
                {/* Indicator */}
                <div
                  ref={indicatorRef}
                  className="absolute left-[2px] top-0 w-[3px] bg-gray-900 rounded-full opacity-0 transition-all duration-300"
                  style={{
                    opacity: currentId ? 1 : 0,
                    height: "16px", // Default height, will be updated by JS
                  }}
                />
                <nav ref={navRef} className="relative">
                  {headings?.length ? (
                    headings.map((heading, index) => {
                      const isActive = heading.anchor === currentId;
                      return (
                        <a
                          key={index}
                          ref={(el) => {
                            if (el) headingRefs.current.set(heading.anchor, el);
                          }}
                          href={`#${heading.anchor}`}
                          onClick={(e) => handleClick(e, heading.anchor)}
                          onMouseEnter={() => setHoveredId(heading.anchor)}
                          onMouseLeave={() => {
                            setHoveredId("");
                          }}
                          className={cn(
                            "block text-sm transition-colors duration-200 relative py-1",
                            {
                              "pl-0": heading.level === 1,
                              "pl-4": heading.level === 2,
                              "pl-8": heading.level === 3,
                              "text-gray-900 font-medium": isActive,
                              "text-gray-500": !isActive,
                            }
                          )}
                        >
                          {heading.text}
                        </a>
                      );
                    })
                  ) : (
                    <div className="block text-gray-500 text-sm transition-colors duration-200 relative py-1">
                      暂无目录
                    </div>
                  )}
                </nav>
              </div>
            </div>

            {/* Drawer footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Icon icon="heroicons:arrow-up" className="w-4 h-4" />
                  <span>{scrollProgress}%</span>
                </div>
                <button
                  onClick={scrollToTop}
                  className="ml-auto text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
                >
                  <Icon icon="heroicons:arrow-up-circle" className="w-4 h-4" />
                  回到顶部
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileToc;
