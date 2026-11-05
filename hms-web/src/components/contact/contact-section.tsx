import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "./contact-form";
import { ContactDetails } from "./contact-details";
import { T } from "@/components/t";

export function ContactSection({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-secondary/70 py-20 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5 sm:rounded-4xl sm:p-10">
          <h2 className="text-2xl font-medium sm:text-3xl"><T>{"Send us a message"}</T></h2>
          <p className="mb-8 mt-3 text-ink-muted"><T>{"Tell us what you're looking for and we'll point you to the right products."}</T></p>
          <Suspense fallback={<div className="h-96 animate-pulse bg-soft" />}>
            <ContactForm />
          </Suspense>
        </div>
        <div>
          <h2 className="mb-8 text-2xl font-medium sm:text-3xl"><T>{"Contact information"}</T></h2>
          <ContactDetails />
        </div>
      </Container>
    </section>
  );
}
