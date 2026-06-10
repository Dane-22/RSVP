"use server";

import { google } from "googleapis";
import { normalizeContact, validateRSVPForm } from "@/lib/validators";
import type { RSVPActionResult, RSVPFormData } from "@/types/rsvp";

const SHEET_HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Contact",
  "Attendance",
  "Message",
] as const;

function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !sheetId) {
    throw new Error(
      "Missing Google Sheets configuration. Check GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID.",
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  return { sheets, sheetId };
}

function formatAttendance(attendance: RSVPFormData["attendance"]): string {
  return attendance === "yes" ? "Yes, Attending" : "No, Regretfully Decline";
}

export async function submitRSVP(
  formData: RSVPFormData,
): Promise<RSVPActionResult> {
  const validationError = validateRSVPForm(formData);
  if (validationError) {
    return { success: false, message: validationError };
  }

  try {
    const { sheets, sheetId } = getGoogleSheetsClient();

    const row = [
      new Date().toISOString(),
      formData.name.trim(),
      formData.email.trim().toLowerCase(),
      normalizeContact(formData.contact),
      formatAttendance(formData.attendance),
      formData.message.trim(),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

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

export async function ensureSheetHeaders(): Promise<void> {
  const { sheets, sheetId } = getGoogleSheetsClient();

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Sheet1!A1:F1",
  });

  if (!existing.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "Sheet1!A1:F1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[...SHEET_HEADERS]],
      },
    });
  }
}
