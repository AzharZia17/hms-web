import type { Metadata, Viewport } from "next";
import { Inter, Sora, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollTop } from "@/components/layout/scroll-top";
import { MobileNav } from "@/components/layout/mobile-nav";
import { WhatsAppWidget } from "@/components/layout/whatsapp-widget";
import { Providers } from "@/components/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { T } from "@/components/t";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const urdu = Noto_Nastaliq_Urdu({ variable: "--font-urdu", subsets: ["arabic"], display: "swap", weight: ["400", "500", "600", "700"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });

export const viewport: Viewport = { themeColor: "#002D60" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "HMS Plastic — Premium Sanitary Ware & Bathroom Fittings", template: "%s | HMS Plastic" },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "HMS Plastic — Redefining Modern Bathroom Living",
    description: site.description,
    images: [{ url: "/brand/hms-logo.png", width: 800, height: 800, alt: "HMS Plastic logo" }],
  },
  twitter: { card: "summary", title: "HMS Plastic", description: site.description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${urdu.variable} font-sans`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("hms-lang")==="ur"){var e=document.documentElement;e.lang="ur";e.dir="rtl"}}catch(e){}` }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Providers>
        <a href="#main" className="sr-only z-[70] bg-gold px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          <T>Skip to content</T>
        </a>
        <TooltipProvider>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
          <ScrollTop />
          <WhatsAppWidget />
        </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
