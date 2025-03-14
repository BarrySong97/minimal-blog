"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams } from "next/navigation";

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

  return (
    <motion.div
      className={cn("flex items-center gap-2  text-foreground/80", className)}
      style={{
        x: slug ? x : "0",
        transformOrigin: "left center",
      }}
    >
      <div className="flex items-center font-bold gap-1">4real</div>
      <div className="w-px h-4 bg-foreground/20" />
      <div className="flex text-sm items-center gap-1">
        <span>{currentTime || "--:--"}</span>
      </div>
    </motion.div>
  );
}
