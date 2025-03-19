import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

// PhotoMeta component for displaying photo metadata
interface PhotoMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  excerpt?: string;
  date: string;
  showExcerpt?: boolean;
}

const PhotoMeta: React.FC<PhotoMetaProps> = ({
  title,
  excerpt,
  date,
  showExcerpt = true,
  className,
  ...props
}) => {
  const formattedDate = format(new Date(date), "MMM d, yyyy");

  return (
    <div className={cn("text-white", className)} {...props}>
      <h3 className="text-lg font-medium line-clamp-1">{title}</h3>

      {showExcerpt && excerpt && (
        <p className="mt-1 text-sm line-clamp-2 text-gray-200">{excerpt}</p>
      )}

      <div className="mt-2 flex items-center text-xs text-gray-300">
        <Icon icon="mdi:calendar" className="mr-1" />
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default PhotoMeta;
