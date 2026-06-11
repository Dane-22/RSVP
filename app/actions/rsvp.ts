"use server";

import { normalizeContact, validateRSVPForm } from "@/lib/validators";
import type { RSVPActionResult, RSVPFormData } from "@/types/rsvp";

export async function submitRSVP(
  formData: RSVPFormData,
): Promise<RSVPActionResult> {
  const validationError = validateRSVPForm(formData);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    return {
      success: false,
      message: "Server configuration error. Missing Apps Script URL.",
    };
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email?.trim().toLowerCase() || "",
        contact: normalizeContact(formData.contact),
        attendance: formData.attendance,
        message: formData.message.trim(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Unknown error from Apps Script");
    }

    return {
      success: true,
      message:
        formData.attendance === "yes"
          ? "Your RSVP has been received. We cannot wait to celebrate with you!"
          : "Thank you for letting us know. You will be in our hearts on our special day.",
    };
  } catch (error) {
    console.error("RSVP submission failed:", error);
    return {
      success: false,
      message:
        "Something went wrong while saving your RSVP. Please try again in a moment.",
    };
  }
}
