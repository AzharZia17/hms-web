export interface ContactInput {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (v.phone.trim() && !/^\+?[\d\s\-()]{7,20}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Please add a subject.";
  if (v.message.trim().length < 10) e.message = "Your message should be at least 10 characters.";
  return e;
}
