import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ContactSection } from "@/components/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact the HMS Plastic team for product enquiries and support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk bathrooms." description="Send an enquiry and the HMS team will help you find the right products." />
      <ContactSection />
    </>
  );
}
