"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";

interface TimeWeatherProps extends React.HTMLAttributes<HTMLDivElement> {
  lng: string;
}

export function TimeWeather({ lng, className, ...props }: TimeWeatherProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const { slug } = useParams();
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
    icon: string;
  }>({
    temp: 0,
    condition: "loading",
    icon: "mdi:weather-cloudy",
  });
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 60], ["0", "-46px"]);

  // Update time every second
  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(
        now.toLocaleTimeString(lng === "en" ? "en-US" : "zh-CN", options)
      );
    };

    // Update immediately and then every second
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [lng]);

  const [isLargeScreen, setIsLargeScreen] = useState(true);
  // Check if screen width is at least 1512px
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsLargeScreen(window.innerWidth >= 1512);
  }, []);
  return (
    <motion.div
      className={cn("flex items-center gap-2  text-foreground/80", className)}
      style={{
        x: slug && isLargeScreen ? x : "0",
        transformOrigin: "left center",
      }}
    >
      <Link href={`/${lng}`} className="flex items-center font-bold gap-1">
        4real
      </Link>
      <div className="w-px h-4 bg-foreground/20 hidden sm:block" />
      <div className=" text-sm items-center gap-1 hidden sm:flex">
        <span>{currentTime || "--:--"}</span>
      </div>
    </motion.div>
  );
}
