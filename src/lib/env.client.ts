import * as z from "zod";

/**
 * Public environment, safe to read in the browser. Next.js only inlines
 * NEXT_PUBLIC_* values referenced by their full literal name, so each one is
 * listed explicitly below rather than read from process.env dynamically.
 *
 * The IDs are interpolated into inline analytics scripts, so each is restricted
 * to its real format to rule out script injection through a bad value.
 */
const schema = z.object({
  NEXT_PUBLIC_GA_ID: z
    .string()
    .regex(/^G-[A-Z0-9]+$/, "Expected a GA4 measurement ID like G-XXXXXXX")
    .optional(),
  NEXT_PUBLIC_GOOGLE_ADS_ID: z
    .string()
    .regex(/^AW-\d+$/, "Expected a Google Ads ID like AW-123456789")
    .optional(),
  NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL: z
    .string()
    .regex(
      /^AW-\d+\/[\w-]+$/,
      "Expected a conversion label like AW-123456789/AbC-dEf",
    )
    .optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z
    .string()
    .regex(/^\d+$/, "Expected a numeric Meta Pixel ID")
    .optional(),
});

export const clientEnv = schema.parse({
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || undefined,
  NEXT_PUBLIC_GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || undefined,
  NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || undefined,
  NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined,
});
