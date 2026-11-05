"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Aceternity UI "Text Generate Effect": words resolve from blur one by one. Static for reduced motion. */
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.6,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (reduce) return;
    animate("span", { opacity: 1, filter: filter ? "blur(0px)" : "none" }, { duration, delay: stagger(0.12) });
  }, [animate, duration, filter, reduce]);

  if (reduce) return <div className={className}>{words}</div>;

  return (
    <div className={cn(className)}>
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span key={word + idx} className="opacity-0" style={{ filter: filter ? "blur(10px)" : "none" }}>
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
