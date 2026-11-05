import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact-schema";

/**
 * Delivers contact form submissions through Resend. When RESEND_API_KEY,
 * CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are not set, the endpoint answers
 * 501 so the UI never reports a fake success.
 */
export async function POST(req: Request) {
  let body: Partial<ContactInput> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend nothing happened.
  if (body.website) return NextResponse.json({ ok: true });

  const input: ContactInput = {
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    email: String(body.email ?? ""),
    subject: String(body.subject ?? ""),
    message: String(body.message ?? ""),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) return NextResponse.json({ error: "Validation failed.", errors }, { status: 422 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: input.email,
      subject: `[HMS website] ${input.subject}`.slice(0, 200),
      html: `<p><strong>Name:</strong> ${esc(input.name)}</p><p><strong>Phone:</strong> ${esc(input.phone) || "—"}</p><p><strong>Email:</strong> ${esc(input.email)}</p><p>${esc(input.message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
