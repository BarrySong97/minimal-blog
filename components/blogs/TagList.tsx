"use client";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { createSerializer, parseAsArrayOf, parseAsString } from "nuqs/server";

// Since BlogTag is not a separate collection, we define the type here based on what getBlogTags returns.
// We assume it returns objects with id and name.
interface BlogTag {
  id: string;
  name?: string | null;
}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
];

interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: string[];
}
const tagsParser = parseAsArrayOf(parseAsString, ",").withDefault([]);
export function TagList({ tags: allTags, className, ...props }: TagListProps) {
  const [tags, setTags] = useQueryState("tags", tagsParser);

  const handleTagClick = (tag: string | null) => {
    if (tag === null) {
      setTags([]);
      return;
    }
    const newTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    setTags(newTags.length > 0 ? newTags : []);
  };

  const isAllSelected = tags.length === 0;

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 motion-opacity-in-[0%] motion-translate-y-in-[-10px] [animation-delay:0.42s]",
        className
      )}
      {...props}
    >
      <button
        key="all"
        onClick={() => handleTagClick(null)}
        className={cn("border px-3 py-1 text-sm transition-colors", {
          "border-primary bg-primary text-primary-foreground": isAllSelected,
          "border-border bg-transparent hover:bg-muted": !isAllSelected,
        })}
      >
        所有
      </button>
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={cn("border px-3 py-1 text-sm transition-colors", {
            "border-primary bg-primary text-primary-foreground":
              tags.includes(tag),
            "border-border bg-transparent hover:bg-muted": !tags.includes(tag),
          })}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
