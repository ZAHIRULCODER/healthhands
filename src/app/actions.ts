"use server";

import { headers } from "next/headers";
import * as z from "zod";
import { services } from "@/content/site";
import {
  type EnquiryField,
  enquiryFields,
  enquirySchema,
  normalisePhone,
} from "@/lib/enquiry-schema";
import { serverEnv } from "@/lib/env.server";

export type EnquiryResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<EnquiryField, string>>;
    };

const payloadSchema = enquirySchema.extend({
  source: z.string().max(200),
});

export async function submitEnquiry(
  input: z.input<typeof payloadSchema>,
): Promise<EnquiryResult> {
  // Validate again on the server: the browser check can be bypassed, and the
  // declared parameter type is not enforced at runtime.
  const parsed = payloadSchema.safeParse(input);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    const fieldErrors: Partial<Record<EnquiryField, string>> = {};
    for (const field of enquiryFields) {
      const first = flat[field]?.[0];
      if (first) fieldErrors[field] = first;
    }
    return { ok: false, message: "Check the highlighted fields.", fieldErrors };
  }

  const { company, ...values } = parsed.data;
  if (company) return { ok: true };

  const lead = {
    ...values,
    phone: `+91${normalisePhone(values.phone)}`,
    serviceName:
      services.find((s) => s.slug === values.service)?.name ?? "Not sure yet",
    channel: "website-form",
    referrer: (await headers()).get("referer") ?? "",
    receivedAt: new Date().toISOString(),
  };

  // The webhook logs the lead in a sheet or CRM (for example a Google Apps
  // Script, Zapier or Make webhook) and alerts the team (brief, section 6).
  const webhook = serverEnv.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("Enquiry webhook failed", err);
      return {
        ok: false,
        message:
          "We could not send your request. Please call or WhatsApp us instead.",
      };
    }
  } else if (serverEnv.NODE_ENV !== "production") {
    console.info("[enquiry] LEAD_WEBHOOK_URL not set. Lead received:", {
      service: lead.service,
      area: lead.area,
      source: lead.source,
    });
  }

  return { ok: true };
}
