"use client";

import { Check } from "lucide-react";
import { colours, type ColourName } from "@/data/colours";
import { cn } from "@/lib/utils";
import { T } from "@/components/t";

export interface ColourSwatchesProps {
  selectedColor?: string;
  onSelectColor?: (color: string) => void;
  compact?: boolean;
  className?: string;
  availableColors?: string[];
}

/**
 * Interactive color swatches.
 * - `compact` renders circular dots for cards.
 * - Standard mode renders labeled buttons that highlight the selected color with a checkmark.
 */
export function ColourSwatches({
  selectedColor,
  onSelectColor,
  compact,
  className,
  availableColors,
}: ColourSwatchesProps) {
  const isInteractive = typeof onSelectColor === "function";

  if (compact) {
    return (
      <ul
        aria-label={`Available colours: ${colours.map((c) => c.name).join(", ")}`}
        className={cn("flex items-center", className)}
      >
        {colours.map((c) => {
          const isSelected = selectedColor === c.name;
          const isAvailable = !availableColors || availableColors.includes(c.name);
          return (
            <li key={c.name} className="-ml-1 first:ml-0">
              <button
                type="button"
                disabled={!isInteractive}
                onClick={(e) => {
                  if (isInteractive) {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectColor(c.name);
                  }
                }}
                title={c.name}
                aria-label={`Select ${c.name} colour`}
                aria-pressed={isSelected}
                className={cn(
                  "relative block h-4 w-4 rounded-full ring-2 transition-all duration-200",
                  isSelected
                    ? "z-10 scale-125 ring-navy shadow-sm"
                    : "ring-white hover:scale-110",
                  !isInteractive && "cursor-default",
                  !isAvailable && "opacity-40",
                )}
                style={{
                  backgroundColor: c.hex,
                  boxShadow: isSelected
                    ? "0 0 0 1.5px #001a38, inset 0 0 0 1px rgba(0,26,56,0.25)"
                    : "inset 0 0 0 1px rgba(0,26,56,0.15)",
                }}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-2" role="radiogroup" aria-label="Available colours">
        {colours.map((c) => {
          const isSelected = selectedColor === c.name;
          const isAvailable = !availableColors || availableColors.includes(c.name);
          const isLight = c.name === "White" || c.name === "Ivory" || c.name === "Beige";
          return (
            <li key={c.name}>
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectColor?.(c.name)}
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium transition-all duration-200 active:scale-95",
                  isSelected
                    ? "bg-navy text-white ring-2 ring-navy shadow-md scale-[1.02]"
                    : "bg-white text-navy ring-1 ring-black/10 hover:ring-navy/40 hover:bg-black/[0.02]",
                  !isAvailable && "opacity-50",
                )}
              >
                <span
                  className={cn(
                    "relative grid h-5 w-5 place-items-center rounded-full transition-transform duration-200 group-hover:scale-105",
                    isSelected && "ring-1 ring-white/60",
                  )}
                  style={{
                    backgroundColor: c.hex,
                    boxShadow: "inset 0 0 0 1px rgba(0,26,56,0.18)",
                  }}
                >
                  {isSelected && (
                    <Check
                      className={cn("h-3 w-3 drop-shadow", isLight ? "text-navy" : "text-white")}
                      strokeWidth={3}
                    />
                  )}
                </span>
                <span>
                  <T>{c.name}</T>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
