import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="HMS Plastic — home" className={cn("inline-flex items-center", className)}>
      <Image src="/brand/hms-logo-transparent.png" alt="HMS Plastic" width={800} height={663} priority={priority} className="h-11 w-auto object-contain sm:h-12" />
    </Link>
  );
}
