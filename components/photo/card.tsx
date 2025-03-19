import { Photo } from "@/payload-types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import CardContent from "@/components/photo/CardContent";
import { getMediaUrl } from "@/components/photo/MediaUtils";

export interface PhotoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, className }) => {
  const { url, blurHash } = getMediaUrl(photo.image);

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardContent
        imageUrl={url}
        title={photo.title}
        excerpt={photo.excerpt}
        date={photo.date}
        blurHash={blurHash}
      />
    </motion.div>
  );
};

export default PhotoCard;
