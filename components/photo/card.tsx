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
        image={photo.image as Media}
        title={photo.title}
        excerpt={photo.excerpt}
        date={photo.date}
        id={photo.id.toString()}
      />
    </div>
  );
};

export default PhotoCard;
