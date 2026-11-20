"use client";

import { useSelector } from "@tanstack/react-form";
import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFieldContext, useFormContext } from "./form-context";

// Larger controls than the shadcn defaults, for older visitors on phones (brief, section 7).
const control =
  "h-12 rounded-md border-input bg-card px-3.5 text-base shadow-xs md:text-base dark:bg-input/30";
// SelectTrigger sets its height with data-[size=default]:h-8, so override through the same selector.
const trigger = cn(
  control,
  "w-full pr-3 data-[size=default]:h-12 data-placeholder:text-muted-foreground [&>svg]:size-5",
);
const label = "text-[0.9375rem] font-medium";
const option = "min-h-11 rounded-md py-2 pl-3 text-base";

/** Validation state shared by every field component. */
function useFieldStatus() {
  const field = useFieldContext<unknown>();
  const isTouched = useSelector(field.store, (s) => s.meta.isTouched);
  const errors = useSelector(field.store, (s) => s.meta.errors);
  const isInvalid = isTouched && errors.length > 0;
  // Errors are Standard Schema issues from Zod, or plain strings set from server results.
  const messages = errors.map((e) => ({
    message:
      typeof e === "string"
        ? e
        : typeof e?.message === "string"
          ? e.message
          : undefined,
  }));
  return { id: `enquiry-${field.name}`, isInvalid, messages };
}

function FieldMessages({
  isInvalid,
  messages,
}: {
  isInvalid: boolean;
  messages: { message?: string }[];
}) {
  return isInvalid ? (
    <FieldError className="font-medium" errors={messages} />
  ) : null;
}

export function TextField({
  label: text,
  hint,
  className,
  ...inputProps
}: { label: string; hint?: string; className?: string } & Pick<
  React.ComponentProps<"input">,
  "type" | "inputMode" | "autoComplete" | "placeholder"
>) {
  const field = useFieldContext<string>();
  const value = useSelector(field.store, (s) => s.value);
  const { id, isInvalid, messages } = useFieldStatus();
  return (
    <Field data-invalid={isInvalid || undefined} className={className}>
      <FieldLabel htmlFor={id} className={label}>
        {text}
        {hint && (
          <span className="font-normal text-muted-foreground">{hint}</span>
        )}
      </FieldLabel>
      <Input
        id={id}
        name={field.name}
        value={value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid || undefined}
        className={control}
        {...inputProps}
      />
      <FieldMessages isInvalid={isInvalid} messages={messages} />
    </Field>
  );
}

export function TextareaField({
  label: text,
  hint,
  placeholder,
  className,
}: {
  label: string;
  hint?: string;
  placeholder?: string;
  className?: string;
}) {
  const field = useFieldContext<string>();
  const value = useSelector(field.store, (s) => s.value);
  const { id, isInvalid, messages } = useFieldStatus();
  return (
    <Field data-invalid={isInvalid || undefined} className={className}>
      <FieldLabel htmlFor={id} className={label}>
        {text}
        {hint && (
          <span className="font-normal text-muted-foreground">{hint}</span>
        )}
      </FieldLabel>
      <Textarea
        id={id}
        name={field.name}
        rows={3}
        value={value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid || undefined}
        placeholder={placeholder}
        className="min-h-24 rounded-md border-input bg-card px-3.5 py-3 text-base shadow-xs md:text-base dark:bg-input/30"
      />
      <FieldMessages isInvalid={isInvalid} messages={messages} />
    </Field>
  );
}

export type SelectOptionGroup = {
  label?: string;
  options: readonly { value: string; label: string }[];
};

export function SelectField({
  label: text,
  placeholder,
  groups,
  className,
  contentClassName,
}: {
  label: string;
  placeholder: string;
  groups: readonly SelectOptionGroup[];
  className?: string;
  contentClassName?: string;
}) {
  const field = useFieldContext<string>();
  const value = useSelector(field.store, (s) => s.value);
  const { id, isInvalid, messages } = useFieldStatus();
  // SelectValue reads labels from `items` so the trigger shows the chosen label.
  const items = Object.fromEntries(
    groups.flatMap((g) => g.options.map((o) => [o.value, o.label])),
  );
  return (
    <Field data-invalid={isInvalid || undefined} className={className}>
      <FieldLabel htmlFor={id} className={label}>
        {text}
      </FieldLabel>
      <Select<string>
        name={field.name}
        items={items}
        value={value || null}
        onValueChange={(next) => field.handleChange(next ?? "")}
        onOpenChange={(open) => {
          if (!open) field.handleBlur();
        }}
      >
        <SelectTrigger
          id={id}
          aria-invalid={isInvalid || undefined}
          className={trigger}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={cn("rounded-md p-1", contentClassName)}>
          {groups.map((group, i) => (
            <SelectGroup key={group.label ?? `group-${i}`}>
              {i > 0 && !group.label && <SelectSeparator />}
              {group.label && (
                <SelectLabel className="px-3 pt-2.5 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {group.label}
                </SelectLabel>
              )}
              {group.options.map((o) => (
                <SelectItem key={o.value} value={o.value} className={option}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      <FieldMessages isInvalid={isInvalid} messages={messages} />
    </Field>
  );
}

export function CheckboxField({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const field = useFieldContext<boolean>();
  const checked = useSelector(field.store, (s) => s.value);
  const { id, isInvalid, messages } = useFieldStatus();
  return (
    <Field
      orientation="horizontal"
      data-invalid={isInvalid || undefined}
      className={cn("items-start", className)}
    >
      <Checkbox
        id={id}
        name={field.name}
        checked={checked}
        onCheckedChange={(next) => {
          field.handleChange(next);
          field.handleBlur();
        }}
        aria-invalid={isInvalid || undefined}
        className="mt-0.5 size-5"
      />
      <FieldContent>
        <FieldLabel
          htmlFor={id}
          className="text-[0.9375rem] leading-relaxed font-normal text-muted-foreground"
        >
          <span>{children}</span>
        </FieldLabel>
        <FieldMessages isInvalid={isInvalid} messages={messages} />
      </FieldContent>
    </Field>
  );
}

/** Spam honeypot: hidden from people and assistive tech, so only bots fill it. */
export function HoneypotField() {
  const field = useFieldContext<string>();
  const value = useSelector(field.store, (s) => s.value);
  return (
    <div className="hidden" aria-hidden="true">
      <label htmlFor={`enquiry-${field.name}`}>Company</label>
      <input
        id={`enquiry-${field.name}`}
        name={field.name}
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  );
}

export function SubmitButton({
  label: text,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const form = useFormContext();
  const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);
  return (
    <Button
      type="submit"
      variant="cta"
      size="xl"
      disabled={isSubmitting}
      className="mt-8 w-full sm:w-auto"
    >
      {isSubmitting && <Spinner data-icon="inline-start" />}
      {isSubmitting ? pendingLabel : text}
    </Button>
  );
}

export function FormAlert({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <Alert
      variant="destructive"
      className="mb-6 border-destructive/40 text-base"
    >
      <CircleAlertIcon />
      <AlertDescription className="font-semibold text-destructive">
        {message}
      </AlertDescription>
    </Alert>
  );
}
