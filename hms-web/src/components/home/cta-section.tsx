import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/cta";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppIcon } from "@/components/layout/whatsapp-widget";
import { whatsappLink } from "@/data/site";
import { T } from "@/components/t";

export function CtaSection() {
  const wa = whatsappLink("Hello HMS Plastic, I'd like to know more about your products.");
  return (
    <section className="bg-white py-24 lg:py-36">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-4xl bg-navy px-6 py-16 text-center text-white sm:rounded-4xl sm:px-12 sm:py-24">
            <span className="eyebrow"><T>{"Get in touch"}</T></span>
            <h2 className="mx-auto mt-6 max-w-3xl text-[2rem] font-medium leading-[1.08] text-white sm:text-5xl lg:text-6xl"><T>{"Let's Create Better Bathroom Spaces."}</T></h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg"><T>{"Explore our products or connect with our team to find the right sanitary solutions."}</T></p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4">
              <ButtonLink href="/products" variant="gold"><T>{"Explore Products"}</T></ButtonLink>
              <ButtonLink href="/contact" variant="outlineLight"><T>{"Contact Our Team"}</T></ButtonLink>
              {wa && <ButtonLink href={wa} external variant="whatsapp"><WhatsAppIcon className="h-5 w-5" /> <T>{"WhatsApp"}</T></ButtonLink>}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
