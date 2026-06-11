import type { RSVPFormData } from "@/types/rsvp";

const PH_CONTACT_REGEX = /^09\d{9}$/;

export function validateRSVPForm(data: RSVPFormData): string | null {
  if (!data.name.trim()) {
    return "Please enter your full name.";
  }

  if (data.email && !data.email.trim()) {
    return "Please enter your email address.";
  }

  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return "Please enter a valid email address.";
    }
  }

  const normalizedContact = data.contact.replace(/\s|-/g, "");
  if (!PH_CONTACT_REGEX.test(normalizedContact)) {
    return "Contact number must be a valid Philippine mobile number (09xxxxxxxxx).";
  }

  if (data.attendance !== "yes" && data.attendance !== "no") {
    return "Please select your attendance.";
  }

  return null;
}

export function normalizeContact(contact: string): string {
  return contact.replace(/\s|-/g, "");
}
