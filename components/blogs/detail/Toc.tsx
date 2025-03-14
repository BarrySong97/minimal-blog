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

export interface TocProps {
  headings: ProcessedHeading[];
  className?: string;
}

const Toc: FC<TocProps> = ({ headings, className }) => {
  const { lng } = useParams();
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string>("");
  const [clickedId, setClickedId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const { data: home } = useQuery({
    queryKey: queryKeys.home,
    queryFn: () => homeService.getHome(),
    staleTime: Infinity,
  });
  // 监听滚动进度
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = Math.round((scrollTop / documentHeight) * 100);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化进度

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 只有在没有点击状态时才更新activeId
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

  // 决定使用哪个ID来更新indicator位置
  const currentId = hoveredId || clickedId || activeId;

  // 当决定显示的ID变化时更新indicator位置
  useEffect(() => {
    updateIndicatorPosition(currentId);
  }, [currentId]);

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

    // 设置点击的ID
    setClickedId(id);

    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // 更新 URL，但不触发新的导航
    window.history.pushState({}, "", `${pathname}#${id}`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("w-full sticky top-[5rem]", className)}>
      <div className="mb-4 flex items-center gap-3">
        <Image
          src={(home?.avatar as Media)?.url ?? ""}
          alt="Profile picture"
          width={96}
          height={96}
          priority
          className={cn(
            "object-cover w-12 h-12 rounded-lg",
            "motion-scale-in-[0.5] motion-opacity-in-[0%] motion-ease-spring-smooth"
          )}
        />
        <div className="space-y-0.5">
          <div className=" font-medium">{home?.name}</div>
          <div className="text-sm text-gray-500">{home?.short_description}</div>
        </div>
      </div>

      <div className="h-[1px] bg-gray-200 my-4" />
      <div className="text-sm font-medium mb-2 relative">
        <div className="font-semibold">目录</div>
      </div>
      <div className="relative">
        {/* Single indicator that will move */}
        <div
          ref={indicatorRef}
          className="absolute left-[2px] top-0 w-[3px] bg-gray-900 rounded-full opacity-0 transition-all duration-300"
          style={{
            opacity: currentId ? 1 : 0,
            height: "16px", // 默认高度，会被JS动态更新
          }}
        />
        <nav ref={navRef} className="relative">
          {headings.map((heading, index) => {
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
          })}
        </nav>
      </div>

      <div className="h-[1px] bg-gray-200 my-4" />

      {/* 阅读进度和回到顶部 */}
      <div className=" flex items-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Icon icon="heroicons:arrow-up" className="w-4 h-4" />
          <span>{scrollProgress}%</span>
        </div>
        <button
          onClick={scrollToTop}
          className="ml-auto text-gray-500 hover:text-gray-900 transition-colors duration-200"
        >
          回到顶部
        </button>
      </div>
    </div>
  );
};

export default Toc;
