import { Media } from "@/payload-types";

export const getImageUrl = (media: Media | string) => {
  const url = typeof media === "string" ? media : media.url;

  if (!url) return "";

  return url.replace(
    "/api/media/file",
    "http://4realstorageapi.zeabur.app/blog"
  );
};
