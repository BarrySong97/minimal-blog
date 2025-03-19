import { cn } from "@/lib/utils";
import BlurImage from "@/components/common/BlurImage";
import PhotoMeta from "@/components/photo/PhotoMeta";
import Image from "next/image";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  excerpt?: string;
  date: string;
  blurHash: string;
}

const CardContent: React.FC<CardContentProps> = ({
  imageUrl,
  title,
  excerpt,
  date,
  className,
  blurHash,
  ...props
}) => {
  const blurDataURL = blurHashToDataURL(blurHash);
  return (
    <div className={cn("relative", className)} {...props}>
      {/* Image container */}
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder-image.jpg"}
          alt={title}
          placeholder="blur"
          blurDataURL={blurDataURL ?? ""}
          width={1000}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

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
