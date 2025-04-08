"use client";
import { useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// 图像组件
const ImageComponent = ({
  src,
  color,
  isDefault = false,
}: {
  src?: string;
  color: string;
  isDefault?: boolean;
}) => (
  <motion.div
    className={cn(
      "w-[800px] h-[450px] rounded-lg shadow-lg relative",
      isDefault ? "shadow-none" : ""
    )}
    style={{
      backgroundImage: src && !isDefault ? `url(${src})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    initial={{ opacity: 1, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    // viewport={{ once: true, amount: 0.8 }}
    // whileHover={{ scale: 1.02 }}
    // whileTap={{ scale: 0.95 }}
  >
    {isDefault ? (
      <div className=" absolute left-[350px] top-0 bottom-0 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 1, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-7xl mb-2"
        >
          MY WORK
        </motion.h1>
        <motion.div
          initial={{ opacity: 1, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-lg font-medium text-gray-500"
        >
          SCROLL TO SEE MORE
        </motion.div>
      </div>
    ) : null}
  </motion.div>
);

// 生成 10 个图像数据
const images = Array.from({ length: 5 }, (_, i) => ({
  color: `hsl(${i * 36}, 70%, 50%)`,
  src: `/gallery/image-${i}.jpg`,
  isDefault: i === 0,
}));

export default function Workshop() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // 调整滚动范围
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", `-86%`]);
  useEffect(() => {
    images.forEach((image) => {
      if (image.src) {
        const img = new Image();
        img.src = image.src;
      }
    });
  }, []);
  return (
    <div className="relative">
      {/* Navbar placeholder - adjust height as needed */}

      <section className="h-[500vh]" ref={containerRef}>
        <div className="sticky left-12  top-16 h-[calc(100vh-4rem)] flex items-center overflow-hidden">
          <motion.div className="flex gap-8" style={{ x }}>
            {images.map((image, index) => {
              return (
                <div key={index} style={{ willChange: "transform" }}>
                  <ImageComponent
                    color={image.color}
                    src={image.src}
                    isDefault={image.isDefault}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
