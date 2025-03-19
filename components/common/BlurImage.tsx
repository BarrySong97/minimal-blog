import Image from "next/image";

import { cn } from "@/lib/utils";
import { getImage } from "@/lib/get-image";

export default async function DynamicImage({
  url,
  alt,
  containerClass,
}: {
  url: string;
  alt?: string;
  containerClass?: string;
}) {
  const image = await getImage(url);

  if (!image) return null;

  const { base64, img } = image;

  return (
    <div className={cn("relative", containerClass)}>
      <Image
        {...img}
        alt={alt || ""}
        placeholder="blur"
        blurDataURL={base64}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
