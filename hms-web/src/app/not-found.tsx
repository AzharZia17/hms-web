import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/cta";
import { T } from "@/components/t";

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="This page couldn't be found." description="The page may have moved, or the product may no longer be listed." />
      <Container className="flex gap-4 py-16">
        <ButtonLink href="/products" variant="navy"><T>{"Browse Products"}</T></ButtonLink>
        <ButtonLink href="/" variant="outline"><T>{"Back to Home"}</T></ButtonLink>
      </Container>
    </>
  );
}
