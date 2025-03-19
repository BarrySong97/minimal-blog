import { Media } from "@/payload-types";

/**
 * Helper function to safely get media URL
 * @param media Media object or ID
 * @returns URL string or empty string if media is not available
 */
export const getMediaUrl = (
  media: number | Media
): { url: string; blurHash: string } => {
  if (typeof media === "number") {
    return { url: "", blurHash: "" };
  }
  return { url: media.url || "", blurHash: media.blurhash || "" };
};

/**
 * Helper function to safely get media dimensions
 * @param media Media object or ID
 * @param dimension Which dimension to get (width or height)
 * @returns Dimension value or 0 if not available
 */
export const getMediaDimension = (
  media: number | Media,
  dimension: "width" | "height"
): number => {
  if (typeof media === "number") {
    return 0;
  }
  return media[dimension] || 0;
};
