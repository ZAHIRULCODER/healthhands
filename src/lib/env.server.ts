import "server-only";
import * as z from "zod";

/**
 * Server-only environment. Importing this from a Client Component fails the
 * build, so secrets like the webhook URL can never reach the browser bundle.
 */
const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  /** Lead sheet or CRM webhook that receives booking requests (brief, section 6). */
  LEAD_WEBHOOK_URL: z.url().optional(),
});

export const serverEnv = schema.parse({
  NODE_ENV: process.env.NODE_ENV,
  LEAD_WEBHOOK_URL: process.env.LEAD_WEBHOOK_URL || undefined,
});
