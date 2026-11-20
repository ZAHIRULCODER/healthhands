"use client";

import { revalidateLogic } from "@tanstack/react-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { submitEnquiry } from "@/app/actions";
import { FormAlert, type SelectOptionGroup } from "@/components/form/fields";
import { useAppForm } from "@/components/form/use-app-form";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { serviceAreas, services, site } from "@/content/site";
import {
  emptyEnquiry,
  enquiryFields,
  enquirySchema,
} from "@/lib/enquiry-schema";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./actions";
import { CheckIcon, PhoneIcon } from "./icons";
import { trackEvent } from "./tracking";

const serviceGroups: SelectOptionGroup[] = [
  { options: services.map((s) => ({ value: s.slug, label: s.name })) },
  { options: [{ value: "not-sure", label: "Not sure yet" }] },
];

const areaGroups: SelectOptionGroup[] = [
  ...serviceAreas.map((z) => ({
    label: z.zone,
    options: z.areas.map((a) => ({ value: a, label: a })),
  })),
  { options: [{ value: "Other", label: "Other area" }] },
];

const knownServices = new Set(services.map((s) => s.slug));

/** Reads ?service= and UTM tags so each lead is logged with its source. */
export function EnquiryFormFromUrl({
  service,
  title,
}: {
  service?: string;
  title?: string;
}) {
  const params = useSearchParams();
  const source = ["utm_source", "utm_medium", "utm_campaign"]
    .map((k) => params.get(k))
    .filter(Boolean)
    .join(" / ");
  return (
    <EnquiryForm
      defaultService={service ?? params.get("service") ?? ""}
      source={source}
      title={title}
    />
  );
}

export function EnquiryForm({
  defaultService = "",
  source = "",
  title = "Book a home visit",
}: {
  defaultService?: string;
  source?: string;
  title?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: {
      ...emptyEnquiry,
      service: knownServices.has(defaultService) ? defaultService : "",
    },
    // Check on submit first, then re-check each field as the visitor corrects it.
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: { onDynamic: enquirySchema },
    onSubmit: async ({ value, formApi }) => {
      setServerError(null);
      const result = await submitEnquiry({ ...value, source });
      if (result.ok) {
        setSubmitted(true);
        return;
      }
      setServerError(result.message);
      for (const field of enquiryFields) {
        const message = result.fieldErrors?.[field];
        if (!message) continue;
        formApi.setFieldMeta(field, (meta) => ({
          ...meta,
          isTouched: true,
          errorMap: { ...meta.errorMap, onServer: message },
        }));
      }
    },
    onSubmitInvalid: () => {
      // Move focus to the first field with a problem, so keyboard and screen reader users land on it.
      requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>("#book-form [aria-invalid=true]")
          ?.focus();
      });
    },
  });

  if (submitted) return <EnquirySuccess />;

  return (
    <Card className="gap-6 rounded-lg py-8 shadow-sm ring-1 ring-foreground/10 md:py-10">
      <CardHeader className="gap-2 px-6 md:px-10">
        <CardTitle className="font-heading text-2xl leading-tight md:text-[1.75rem]">
          {title}
        </CardTitle>
        <CardDescription className="text-base">
          Four quick details. We call you back to confirm the time and price.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 md:px-10">
        <form
          id="book-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FormAlert message={serverError} />

          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <form.AppField name="name">
              {(field) => <field.TextField label="Name" autoComplete="name" />}
            </form.AppField>
            <form.AppField name="phone">
              {(field) => (
                <field.TextField
                  label="Mobile number"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98300 00000"
                />
              )}
            </form.AppField>
            <form.AppField name="service">
              {(field) => (
                <field.SelectField
                  label="Service"
                  placeholder="Choose a service"
                  groups={serviceGroups}
                />
              )}
            </form.AppField>
            <form.AppField name="area">
              {(field) => (
                <field.SelectField
                  label="Area"
                  placeholder="Choose your area"
                  groups={areaGroups}
                  contentClassName="max-h-80"
                />
              )}
            </form.AppField>
            <form.AppField name="message">
              {(field) => (
                <field.TextareaField
                  label="Message"
                  hint=" (optional)"
                  placeholder="For example: fasting test for my mother, any morning this week"
                  className="sm:col-span-2"
                />
              )}
            </form.AppField>
            <form.AppField name="consent">
              {(field) => (
                <field.CheckboxField className="sm:col-span-2">
                  I agree that HealthHands may store these details and contact
                  me by call or WhatsApp about this enquiry, as described in the{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    privacy policy
                  </Link>
                  .
                </field.CheckboxField>
              )}
            </form.AppField>
          </FieldGroup>

          <form.AppField name="company">
            {(field) => <field.HoneypotField />}
          </form.AppField>

          <form.AppForm>
            <form.SubmitButton
              label="Send booking request"
              pendingLabel="Sending…"
            />
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
  );
}

function EnquirySuccess() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("generate_lead", { page: window.location.pathname });
    ref.current?.focus();
  }, []);

  return (
    <Card
      ref={ref}
      tabIndex={-1}
      aria-live="polite"
      className="self-start rounded-lg py-8 shadow-sm ring-1 ring-foreground/10 outline-none md:py-10"
    >
      <CardHeader className="px-8 md:px-10">
        <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
          <CheckIcon className="size-5" />
        </span>
        <CardTitle className="mt-5 font-heading text-2xl md:text-3xl">
          Thank you. Your request is in.
        </CardTitle>
        <CardDescription className="mt-2 text-base leading-relaxed">
          We will contact you within {site.responseMinutes} minutes during
          working hours. If it is urgent, call us now.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-8 sm:flex-row md:px-10">
        <a
          href={site.phoneHref}
          className={cn(buttonVariants({ variant: "cta", size: "xl" }))}
        >
          <PhoneIcon data-icon="inline-start" />
          Call {site.phone}
        </a>
        <WhatsAppButton label="Message on WhatsApp" />
      </CardContent>
    </Card>
  );
}
