"use client";
import { cn } from "@/lib/utils";
import PhotoMeta from "@/components/photo/PhotoMeta";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { Media } from "@/payload-types";
import { motion } from "framer-motion";
import { useLayoutNavigation } from "@/hooks/use-layout-navigation";
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  image: Media;
  title: string;
  excerpt?: string;
  date: string;
  id?: string;
  lang?: string;
}

const CardContent: React.FC<CardContentProps> = ({
  image,
  title,
  excerpt,
  date,
  className,
  id,
  lang = "en",
  ...props
}) => {
  const { push } = useLayoutNavigation();
  return (
    <div className={cn("relative cursor-pointer group ", className)} {...props}>
      {/* Image container */}
      <motion.div layoutId={`photo-${id}`} className={cn("aspect-[4/3]  ")}>
        <motion.div
          onClick={() => push(`/${lang}/photo/${id}`)}
          className="h-full w-full "
          layoutId={`photo-image-${id}`}
        >
          <ImageWithFallback
            image={image}
            decoding="sync"
            alt={title}
            width={600}
            height={600}
            className="h-full w-full object-cover transition-transform duration-300 "
          />
        </motion.div>
      </motion.div>

      {/* Content overlay - only covers the meta information area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-auto pb-4 pt-16" />

      {/* Photo info - always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <PhotoMeta title={title} excerpt={excerpt} date={date} />
      </div>
    </div>
  );
};

export default CardContent;
