import { colours } from "@/data/colours";
import { cn } from "@/lib/utils";
import { T } from "@/components/t";

/** Round swatches. `compact` shows dots only (for cards); otherwise dots with names. */
export function ColourSwatches({ compact, className }: { compact?: boolean; className?: string }) {
  if (compact)
    return (
      <ul aria-label={`Available colours: ${colours.map((c) => c.name).join(", ")}`} className={cn("flex items-center", className)}>
        {colours.map((c) => (
          <li key={c.name} title={c.name} className="-ml-1 h-3.5 w-3.5 rounded-full ring-2 ring-white first:ml-0 sm:h-4 sm:w-4" style={{ backgroundColor: c.hex, boxShadow: "inset 0 0 0 1px rgba(0,26,56,0.15)" }} />
        ))}
      </ul>
    );
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {colours.map((c) => (
        <li key={c.name} className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-navy ring-1 ring-black/5">
          <span className="h-5 w-5 rounded-full" style={{ backgroundColor: c.hex, boxShadow: "inset 0 0 0 1px rgba(0,26,56,0.18)" }} />
          <T>{c.name}</T>
        </li>
      ))}
    </ul>
  );
}
