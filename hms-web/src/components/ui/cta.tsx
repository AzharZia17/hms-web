import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  gold: "bg-gold text-navy-ink hover:bg-[#e8a50f]",
  navy: "bg-navy text-white shadow-card hover:bg-navy-ink",
  outline: "border border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
  outlineLight: "border border-white/30 bg-transparent text-white hover:bg-white hover:text-navy",
  light: "bg-white text-navy hover:bg-gold-soft",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
} as const;

export const ctaBase =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

type Common = { variant?: keyof typeof variants; shine?: boolean; className?: string };

export function ButtonLink({
  variant = "navy",
  shine,
  className,
  href,
  external,
  ...props
}: Common & { href: string; external?: boolean } & Omit<React.ComponentProps<"a">, "href">) {
  const cls = cn(ctaBase, variants[variant], shine && "shine", className);
  if (external) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props} />;
  return <Link href={href} className={cls} {...props} />;
}

export function CtaButton({ variant = "navy", shine, className, ...props }: Common & React.ComponentProps<"button">) {
  return <button className={cn(ctaBase, variants[variant], shine && "shine", className)} {...props} />;
}
