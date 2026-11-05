import { Download, ExternalLink, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/cta";
import { T } from "@/components/t";

export const CATALOGUE_URL = "/catalogue/hms-catalogue.pdf";

/** Catalogue call-out. The PDF itself opens only from the buttons below. */
export function CatalogueSection() {
  return (
    <section id="catalogue" className="bg-secondary/70 py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-4xl bg-white p-7 shadow-card ring-1 ring-hairline sm:p-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex items-start gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy text-gold sm:h-16 sm:w-16">
                <FileText className="h-7 w-7" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <span className="eyebrow"><T>{"Catalogue"}</T></span>
                <h2 className="mt-4 text-[1.7rem] font-medium leading-[1.1] sm:text-4xl"><T>{"Browse the full HMS catalogue."}</T></h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted"> <T>{"Plastic sanitary fittings and bathroom accessories — every product in one PDF."}</T> </p>
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href={CATALOGUE_URL} external variant="navy">
                <ExternalLink className="h-4 w-4" /> <T>{"Open Catalogue"}</T> </ButtonLink>
              <ButtonLink href={CATALOGUE_URL} external download="HMS-Plastic-Catalogue.pdf" variant="outline">
                <Download className="h-4 w-4" /> <T>{"Download Catalogue"}</T> </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
