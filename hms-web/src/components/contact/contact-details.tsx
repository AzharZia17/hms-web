import { Mail, MapPin, Phone } from "lucide-react";
import { site, telHref, whatsappLink } from "@/data/site";
import { SocialIcons } from "@/components/social-icons";
import { WhatsAppIcon } from "@/components/layout/whatsapp-widget";
import { T } from "@/components/t";

export function ContactDetails() {
  const wa = whatsappLink("Hello HMS Plastic, I'd like to know more about your products.");
  const rows = [
    ...site.phones.map((n, i) => ({ icon: Phone, label: i === 0 ? "Phone" : "Phone 2", value: n, href: telHref(n) })),
    site.email && { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    site.address && { icon: MapPin, label: "Address", value: site.address },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href?: string }[];

  return (
    <div className="space-y-6">
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-4 overflow-hidden rounded-3xl bg-whatsapp p-5 text-white transition-colors hover:bg-whatsapp-dark">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20"><WhatsAppIcon className="h-8 w-8" /></span>
          <span>
            <span className="block font-display text-lg font-semibold"><T>{"Chat on WhatsApp"}</T></span>
            <span className="text-sm text-white/90">{site.phone}</span>
          </span>
        </a>
      )}

      {rows.length > 0 && (
        <ul className="space-y-3">
          {rows.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex items-center gap-4 rounded-2xl bg-secondary/70 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-gold shadow-sm"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted"><T>{label}</T></p>
                {href ? <a href={href} className="font-semibold text-navy hover:text-gold">{value}</a> : <p className="font-semibold text-navy"><T>{value}</T></p>}
              </div>
            </li>
          ))}
        </ul>
      )}

      <SocialIcons itemClassName="border-navy/15 text-navy" />

      <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-secondary shadow-sm ring-1 ring-black/5">
        {site.mapEmbedUrl ? (
          <iframe src={site.mapEmbedUrl} title="HMS Plastic location on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" allowFullScreen />
        ) : (
          <div className="hairline-grid grid h-full place-items-center p-6 text-center">
            <div>
              <MapPin className="mx-auto h-8 w-8 text-navy/40" strokeWidth={1.25} />
              <p className="mt-3 font-display font-semibold text-navy"><T>{"Map location"}</T></p>
              <p className="mt-1 text-sm text-ink-muted"><T>{"Set NEXT_PUBLIC_MAP_EMBED_URL to show the Google Map here."}</T></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
