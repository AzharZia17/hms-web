import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { T } from "@/components/t";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <span className="eyebrow"><T>{eyebrow}</T></span>
      <h2 className={cn("mt-5 text-[1.9rem] font-medium leading-[1.1] sm:text-4xl lg:text-5xl", light && "text-white")}><T>{title}</T></h2>
      {description && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-white/70" : "text-ink-muted")}><T>{description}</T></p>}
    </Reveal>
  );
}
