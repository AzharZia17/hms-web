"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/contact-schema";
import { CtaButton } from "@/components/ui/cta";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { T } from "@/components/t";

type Status = "idle" | "sending" | "sent" | "not_configured" | "error";

const fieldCls = "h-12 rounded-2xl border-black/10 bg-secondary/60 px-4 text-base focus-visible:border-gold focus-visible:bg-white md:text-base";

export function ContactForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<ContactInput>({ name: "", phone: "", email: "", subject: params.get("subject") ?? "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`cf-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, website: honeypot }) });
      if (res.ok) {
        setStatus("sent");
        setValues({ name: "", phone: "", email: "", subject: "", message: "" });
      } else if (res.status === 501) setStatus("not_configured");
      else if (res.status === 422) {
        setErrors((await res.json()).errors ?? {});
        setStatus("idle");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const input = (k: keyof ContactInput, label: string, props: React.ComponentProps<"input"> = {}) => (
    <div className="space-y-2">
      <Label htmlFor={`cf-${k}`} className="text-sm font-semibold text-navy"><T>{label}</T></Label>
      <Input
        id={`cf-${k}`}
        name={k}
        value={values[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `cf-${k}-err` : undefined}
        className={fieldCls}
        {...props}
      />
      {errors[k] && <p id={`cf-${k}-err`} role="alert" className="text-sm text-red-600"><T>{errors[k]}</T></p>}
    </div>
  );

  if (status === "sent")
    return (
      <div role="status" className="rounded-3xl bg-secondary p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h3 className="mt-4 text-2xl font-medium"><T>{"Message sent"}</T></h3>
        <p className="mt-2 text-ink-muted"><T>{"Thank you — our team will get back to you shortly."}</T></p>
        <CtaButton className="mt-6" variant="outline" onClick={() => setStatus("idle")}><T>{"Send another message"}</T></CtaButton>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {input("name", "Name *", { autoComplete: "name", required: true })}
        {input("phone", "Phone", { type: "tel", autoComplete: "tel" })}
      </div>
      {input("email", "Email *", { type: "email", autoComplete: "email", required: true })}
      {input("subject", "Subject *", { required: true })}
      <div className="space-y-2">
        <Label htmlFor="cf-message" className="text-sm font-semibold text-navy"><T>{"Message *"}</T></Label>
        <Textarea
          id="cf-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={cn(fieldCls, "h-auto resize-y py-3")}
        />
        {errors.message && <p id="cf-message-err" role="alert" className="text-sm text-red-600"><T>{errors.message}</T></p>}
      </div>
      <div aria-hidden className="absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0">
        <label><T>{"Website"}</T><input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
      </div>

      {status === "not_configured" && (
        <div role="alert" className="flex gap-3 rounded-2xl border border-gold/50 bg-gold-soft/40 p-4 text-sm text-ink">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p>
            <strong><T>{"Your message was not sent."}</T></strong> <T>{"Email delivery has not been configured yet on this site. Please set the email variables listed in"}</T> <code><T>{".env.example"}</T></code><T>{", or message us on WhatsApp using the chat button."}</T> </p>
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p><T>{"Something went wrong and your message was not sent. Please try again in a moment."}</T></p>
        </div>
      )}

      <CtaButton type="submit" variant="gold" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> <T>{"Sending…"}</T></> : <T>{"Send Message"}</T>}
      </CtaButton>
    </form>
  );
}
