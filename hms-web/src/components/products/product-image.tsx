import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage as Img } from "@/types/product";

/**
 * Renders a product photo at a fixed ratio. "contain" images are shown whole
 * on a colour matched to the photo background.
 */
export function ProductPicture({
  image,
  sizes,
  priority,
  className,
  hoverZoom = true,
}: {
  image: Img;
  sizes: string;
  priority?: boolean;
  className?: string;
  hoverZoom?: boolean;
}) {
  const zoom = hoverZoom && "transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]";
  if (image.fit === "contain") {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)} style={{ backgroundColor: image.bg ?? "#9a9a9a" }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={cn("object-contain", zoom)} />
      </div>
    );
  }
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#c8c8c8]", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectPosition: image.position }}
        className={cn("object-cover", zoom)}
      />
    </div>
  );
}
