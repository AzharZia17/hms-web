"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { site } from "@/data/site";
import { getProduct } from "@/data/products";
import { T } from "@/components/t";
import { useLang } from "@/lib/i18n/lang-provider";

/** Official WhatsApp glyph. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} fill="currentColor">
      <path d="M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.67-1.7A12.95 12.95 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3Zm0 23.7c-1.97 0-3.9-.53-5.58-1.53l-.4-.24-3.96 1.01 1.06-3.86-.26-.4A10.66 10.66 0 0 1 5.3 16c0-5.9 4.8-10.7 10.7-10.7S26.7 10.1 26.7 16s-4.8 10.7-10.7 10.7Zm5.87-8c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.21-.37.24-.7.08-.32-.16-1.36-.5-2.59-1.6a9.7 9.7 0 0 1-1.79-2.22c-.19-.32 0-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.1 1.31 3.32.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.21-.62-.37Z" />
    </svg>
  );
}

const quick = [
  "I'd like to enquire about a product",
  "Please share your product catalogue",
  "I'd like to speak with your team",
];

/** Floating WhatsApp "chatbot" shown on every page. Opens a chat panel with quick replies that deep-link into WhatsApp. */
export function WhatsAppWidget() {
  const pathname = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [text, setText] = useState("");

  const slug = pathname.startsWith("/products/") ? pathname.split("/")[2] : undefined;
  const product = slug ? getProduct(slug) : undefined;

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("hms-wa-seen") === "1"; } catch {}
    if (seen) return;
    const t = setTimeout(() => {
      setBubble(true);
      try { sessionStorage.setItem("hms-wa-seen", "1"); } catch {}
    }, 4500);
    const h = setTimeout(() => setBubble(false), 11000);
    return () => { clearTimeout(t); clearTimeout(h); };
  }, []);

  const dismissBubble = () => {
    setBubble(false);
    try { sessionStorage.setItem("hms-wa-seen", "1"); } catch {}
  };

  if (!site.whatsapp) return null;
  const link = (msg: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
  const context = product ? ` (${product.name})` : "";

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(link(`${text.trim() || "Hello HMS Plastic!"}${context}`), "_blank", "noopener,noreferrer");
    setText("");
  };

  return (
    <div className="fixed bottom-[5.5rem] right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with HMS Plastic on WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            style={{ transformOrigin: "bottom right" }}
            className="w-[min(92vw,22rem)] overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/5"
          >
            <div className="flex items-center gap-3 bg-whatsapp-dark px-4 py-3.5 text-white">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
                <Image src="/brand/hms-logo-transparent.png" alt="" width={44} height={36} className="h-8 w-auto" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold"><T>{"HMS Plastic"}</T></p>
                <p className="flex items-center gap-1.5 text-xs text-white/85"><span className="h-2 w-2 rounded-full bg-[#7CFFB2]" /> <T>{"WhatsApp"}</T></p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 bg-[#ECE5DD] p-4" style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.045) 1px, transparent 1px)", backgroundSize: "18px 18px" }}>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-ink shadow-sm"> <T>{"Hi 👋 Welcome to"}</T> <strong><T>{"HMS Plastic"}</T></strong>!<br />
                {product ? <><T>{"Interested in the"}</T> <strong><T>{product.name}</T></strong>? <T>{"Tap below and we'll help."}</T></> : <T>{"How can we help you today?"}</T>}
              </motion.div>
              <div className="flex flex-col items-end gap-2">
                {quick.map((q, i) => (
                  <motion.a
                    key={q}
                    href={link(`${q}${context}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <T>{q}</T>
                  </motion.a>
                ))}
              </div>
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t border-black/5 bg-white p-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("Type your message…")}
                aria-label="Your message"
                className="h-11 min-w-0 flex-1 rounded-full bg-secondary px-4 text-base outline-none focus:ring-2 focus:ring-whatsapp/50 sm:text-sm"
              />
              <button type="submit" aria-label="Send on WhatsApp" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-whatsapp text-white transition-transform hover:scale-105 active:scale-95">
                <Send className="h-[18px] w-[18px]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex items-center gap-3">
        <AnimatePresence>
          {bubble && !open && (
            <motion.button
              type="button"
              onClick={() => { dismissBubble(); setOpen(true); }}
              initial={{ opacity: 0, x: 16, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.9 }}
              className="relative max-w-[13.5rem] rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-left text-sm font-medium text-ink shadow-xl ring-1 ring-black/5"
            >
              <span
                role="button"
                aria-label="Dismiss"
                onClick={(e) => { e.stopPropagation(); dismissBubble(); }}
                className="absolute -left-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-navy text-white"
              >
                <X className="h-3 w-3" />
              </span> <T>{"Hi 👋 Need help? Chat with us on WhatsApp"}</T> </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => { dismissBubble(); setOpen((o) => !o); }}
          aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
          aria-expanded={open}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.6 }}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-card"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="relative">
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
                <WhatsAppIcon className="h-7 w-7" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
