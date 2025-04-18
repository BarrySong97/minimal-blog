import { Media, Photo } from "@/payload-types";
import { cn } from "@/lib/utils";
import CardContent from "@/components/photo/CardContent";
import Link from "next/link";

export interface PhotoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  photo: Photo;
  lang: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, className, lang }) => {
  return (
    <div className={cn("group relative ", className)}>
      <CardContent
        image={photo.images[0].image as Media}
        title={photo.title}
        excerpt={photo.excerpt}
        date={photo.date}
        lang={lang}
        id={photo.id.toString()}
      />
    </div>
  );
};

export default PhotoCard;
