"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
interface TimeWeatherProps extends React.HTMLAttributes<HTMLDivElement> {
  lng: string;
  isLargeScreen: boolean;
}

export function TimeWeather({
  lng,
  className,
  isLargeScreen,
  ...props
}: TimeWeatherProps) {
  const { slug } = useParams();

  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 60], ["0", "-88px"]);

  return (
    <motion.div
      className={cn("flex items-center gap-2 text-foreground/80 ", className)}
      style={{
        x: slug && isLargeScreen ? x : "0",
        transformOrigin: "left center",
      }}
    >
      <Link href={`/${lng}`} className="flex items-center font-bold gap-4">
        <div className="relative  rounded-sm   flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="4Real"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div>4real</div>
      </Link>
    </motion.div>
  );
}
