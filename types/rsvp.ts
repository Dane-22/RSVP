export type AttendanceOption = "yes" | "no";

export interface RSVPFormData {
  name: string;
  email?: string;
  contact: string;
  attendance: AttendanceOption;
  message: string;
}

export type RSVPSubmitState = "idle" | "pending" | "success" | "error";

export interface RSVPActionResult {
  success: boolean;
  message: string;
}
