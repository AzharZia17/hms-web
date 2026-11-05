import { Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/cta";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/layout/whatsapp-widget";
import type { Product } from "@/types/product";
import { T } from "@/components/t";

export function EnquiryActions({ product }: { product: Product }) {
  const wa = whatsappLink(`Hello HMS Plastic, I'd like to enquire about: ${product.name}${product.code ? ` (${product.code})` : ""}. Colour: `);
  const subject = encodeURIComponent(`Enquiry: ${product.name}`);
  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink href={`/contact?subject=${subject}`} variant="gold">
        <Send className="h-4 w-4" /> <T>{"Enquire About This Product"}</T> </ButtonLink>
      {wa && (
        <ButtonLink href={wa} external variant="whatsapp">
          <WhatsAppIcon className="h-5 w-5" /> <T>{"WhatsApp Enquiry"}</T> </ButtonLink>
      )}
    </div>
  );
}
