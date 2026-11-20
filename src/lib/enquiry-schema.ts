import * as z from "zod";
import { allAreas, services } from "@/content/site";

const serviceSlugs = new Set<string>([
  ...services.map((s) => s.slug),
  "not-sure",
]);
const areaNames = new Set<string>([...allAreas, "Other"]);

/** Strips spaces, dashes and a leading +91 or 0, leaving the 10-digit mobile number. */
export function normalisePhone(value: string) {
  return value.replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");
}

/**
 * Shared by the booking form (TanStack Form, in the browser) and the server
 * action, so both sides apply exactly the same rules.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter the patient's or your name.")
    .max(80, "Keep the name under 80 characters."),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => /^[6-9]\d{9}$/.test(normalisePhone(v)),
      "Enter a 10-digit Indian mobile number.",
    ),
  service: z.string().refine((v) => serviceSlugs.has(v), "Choose a service."),
  area: z.string().refine((v) => areaNames.has(v), "Choose your area."),
  message: z
    .string()
    .trim()
    .max(1000, "Keep the message under 1,000 characters."),
  consent: z
    .boolean()
    .refine((v) => v, "Tick the box so we can contact you about this enquiry."),
  /** Honeypot: hidden from real visitors, so any value means a bot filled the form. */
  company: z.string().max(100),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;
export type EnquiryField = keyof EnquiryValues;

/** Field names in schema order, typed so callers never need to cast. */
export const enquiryFields = enquirySchema.keyof().options;

// Annotated (not `satisfies`) so `consent` stays `boolean` instead of narrowing to `false`.
export const emptyEnquiry: EnquiryValues = {
  name: "",
  phone: "",
  service: "",
  area: "",
  message: "",
  consent: false,
  company: "",
};
