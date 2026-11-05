"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/cta";
import { getCategory } from "@/data/categories";
import { getProduct } from "@/data/products";
import { ProductPicture } from "@/components/products/product-image";
import { T } from "@/components/t";
import { useLang } from "@/lib/i18n/lang-provider";

const ease = [0.22, 1, 0.36, 1] as const;
const headlines = {
  en: [{ w: "Redefining" }, { w: "Modern" }, { w: "Bathroom", gold: true }, { w: "Living." }],
  ur: [{ w: "جدید" }, { w: "باتھ روم", gold: true }, { w: "طرزِ زندگی" }, { w: "کی" }, { w: "نئی" }, { w: "تعریف۔" }],
} as const;
const SLIDES = ["shower-head-round", "sink-mixer-pillar", "wall-mixer-3in1", "health-faucet-chrome", "shower-hose-chrome"].map((s) => getProduct(s)!);
const INTERVAL = 5200;

/** Wraps a CTA so it gently follows the pointer (fine pointers only). */
function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

function Waves() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden sm:h-32">
      <svg viewBox="0 0 2880 160" preserveAspectRatio="none" className="hero-wave-a absolute bottom-0 h-full w-[200%] text-white/[0.07]">
        <path fill="currentColor" d="M0 80c240-60 480-60 720 0s480 60 720 0 480-60 720 0 480 60 720 0v80H0Z" />
      </svg>
      <svg viewBox="0 0 2880 160" preserveAspectRatio="none" className="hero-wave-b absolute bottom-0 h-[78%] w-[200%] text-white/[0.12]">
        <path fill="currentColor" d="M0 90c180 50 540 50 720 0s540-50 720 0 540 50 720 0 540-50 720 0v70H0Z" />
      </svg>
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute bottom-0 h-[52%] w-full text-white">
        <path fill="currentColor" d="M0 110c240-70 480-70 720-20s480 40 720-30v100H0Z" />
      </svg>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { lang, t } = useLang();
  const headline = headlines[lang] as readonly { w: string; gold?: boolean }[];
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hv = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => { setMotionOk(!mq.matches); setCanHover(hv.matches); };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Autoplay (pauses on hover/focus, hidden tab, reduced motion)
  useEffect(() => {
    if (paused || !motionOk) return;
    const t = setTimeout(() => {
      setDir(1);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, motionOk]);

  const go = useCallback((i: number) => setIndex((i + SLIDES.length) % SLIDES.length), []);

  // Scroll-linked depth
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.15]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const bigX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);

  // Pointer: 3D tilt + glare + cursor spotlight
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const rotateX = useTransform(sy, [0, 1], [7, -7]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${useTransform(sx, (v) => v * 100)}% ${useTransform(sy, (v) => v * 100)}%, rgba(255,255,255,0.22), transparent 55%)`;
  const spotX = useMotionValue(70);
  const spotY = useMotionValue(30);
  const spot = useMotionTemplate`radial-gradient(520px circle at ${spotX}% ${spotY}%, rgba(0,92,190,0.45), transparent 60%)`;

  const slide = SLIDES[index];
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-navy-ink pb-32 text-white sm:pb-40"
      onPointerMove={(e) => {
        if (!canHover || !motionOk) return;
        const r = e.currentTarget.getBoundingClientRect();
        spotX.set(((e.clientX - r.left) / r.width) * 100);
        spotY.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <motion.div aria-hidden style={{ backgroundImage: spot }} className="absolute inset-0 -z-20" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_80%_0%,rgba(0,61,128,0.5),transparent_55%)]" />
      <div aria-hidden className="hairline-grid absolute inset-0 -z-10 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] invert" />

      {/* Oversized outlined wordmark */}
      <motion.span
        aria-hidden
        style={{ x: bigX }}
        className="pointer-events-none absolute -bottom-[6%] left-[-4%] -z-10 select-none whitespace-nowrap font-display text-[38vw] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] lg:text-[26vw]"
      > <T>{"HMS"}</T> </motion.span>

      <div className="mx-auto grid min-h-svh w-full max-w-[1280px] items-center gap-9 px-5 pt-24 sm:gap-12 sm:px-8 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-12 lg:pt-32">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.span {...rise(0.1)} className="eyebrow"><T>{"Sanitary Ware & Bathroom Fittings"}</T></motion.span>
          <h1 className="mt-5 text-[2.45rem] sm:mt-7 font-medium leading-[1.04] tracking-[-0.045em] text-white min-[400px]:text-[3rem] sm:text-6xl lg:text-[5.2rem]" aria-label={t("Redefining Modern Bathroom Living.")}>
            {headline.map(({ w, gold }, i) => (
              <span key={w} aria-hidden className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                <motion.span
                  className={gold ? "inline-block text-gold" : "inline-block"}
                  initial={reduce ? false : { y: "115%", rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.12, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...rise(0.75)} className="mt-5 sm:mt-7 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-xl"> <T>{"Discover thoughtfully crafted sanitary solutions that combine elegant design, reliable quality, and everyday comfort."}</T> </motion.p>
          <motion.div {...rise(0.9)} className="mt-7 flex sm:mt-9 gap-2.5 sm:gap-4">
            <Magnetic className="flex flex-1 sm:flex-none">
              <ButtonLink href="/products" variant="gold" shine className="w-full whitespace-nowrap px-3 text-[12.5px] tracking-normal min-[380px]:text-[13px] sm:px-8 sm:text-sm"><T>{"Explore Our Products"}</T></ButtonLink>
            </Magnetic>
            <Magnetic className="flex flex-1 sm:flex-none">
              <ButtonLink href="/about" variant="outlineLight" className="w-full whitespace-nowrap px-3 text-[12.5px] tracking-normal min-[380px]:text-[13px] sm:px-8 sm:text-sm"><T>{"Discover HMS"}</T></ButtonLink>
            </Magnetic>
          </motion.div>
          <motion.a {...rise(1.1)} href="#highlights" aria-label="Scroll to content" className="mt-12 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white lg:inline-flex">
            <span className="grid h-10 w-6 place-items-start justify-center rounded-full border border-white/30 pt-2"><ArrowDown className="h-3 w-3 animate-bounce text-gold" /></span> <T>{"Scroll"}</T> </motion.a>
        </motion.div>

        {/* Product showcase */}
        <motion.div style={{ y: stageY, scale: stageScale }} className="relative mx-auto w-full max-w-[290px] sm:max-w-[420px] lg:max-w-[460px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            style={{ perspective: 1100 }}
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse" || !motionOk) return;
              const r = e.currentTarget.getBoundingClientRect();
              px.set((e.clientX - r.left) / r.width);
              py.set((e.clientY - r.top) / r.height);
            }}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => { px.set(0.5); py.set(0.5); setPaused(false); }}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <motion.div style={motionOk && canHover ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined} className="relative">
              <div aria-hidden className="absolute -inset-3 rounded-[2.6rem] border border-white/10" />
              <motion.div
                className="relative aspect-[4/5] touch-pan-y overflow-hidden rounded-4xl bg-navy shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/20"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) { setDir(1); go(index + 1); }
                  else if (info.offset.x > 50) { setDir(-1); go(index - 1); }
                }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={slide.slug}
                    className="absolute inset-0"
                    initial={{ clipPath: dir > 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)", transition: { duration: 1, ease } }}
                    exit={{ opacity: 1, transition: { duration: 1.05 } }}
                  >
                    <motion.div
                      className="h-full w-full"
                      initial={{ scale: 1.18 }}
                      animate={{ scale: 1, transition: { duration: 1.6, ease } }}
                    >
                      <ProductPicture image={slide.images[0]} sizes="(min-width:1024px) 34vw, 80vw" priority={index === 0} hoverZoom={false} />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                <motion.div aria-hidden style={{ backgroundImage: glare }} className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-navy-ink/85 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={slide.slug}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease }}
                      className="flex items-end justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")} · {t(getCategory(slide.category)?.name ?? "")}</p>
                        <p className="mt-1 truncate font-display text-lg font-medium text-white sm:text-xl"><T>{slide.name}</T></p>
                      </div>
                      <Link href={`/products/${slide.slug}`} aria-label={`View ${slide.name}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-navy transition-colors hover:bg-gold">
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* Progress segments */}
            <div role="tablist" aria-label="Featured products" className="mt-6 flex gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.slug}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show ${s.name}`}
                  onClick={() => { setDir(i >= index ? 1 : -1); go(i); }}
                  className="group relative h-6 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/20">
                    {i === index ? (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gold"
                        initial={{ scaleX: motionOk && !paused ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: motionOk && !paused ? INTERVAL / 1000 : 0, ease: "linear" }}
                      />
                    ) : (
                      <span className={`absolute inset-0 rounded-full bg-white/40 transition-opacity ${i < index ? "opacity-100" : "opacity-0"} group-hover:opacity-100`} />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Waves />
    </section>
  );
}
