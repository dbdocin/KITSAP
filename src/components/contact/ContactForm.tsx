"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  budgetOptions,
  durationOptions,
  projectTypeOptions,
  serviceOptions,
  timelineOptions,
  videoCountOptions,
} from "@/data/form-options";
import {
  BOT_FIELD_NAME,
  emptyQuoteValues,
  getFieldErrors,
  limits,
  quoteFieldOrder,
  quoteSchema,
  type QuoteFieldErrors,
  type QuoteFieldName,
  type QuoteFormValues,
} from "@/lib/validation";
import { SelectField, TextAreaField, TextField } from "./fields";

type Status = "idle" | "pending" | "success" | "error";

interface ContactFormProps {
  /** Public contact email, shown in the error message when configured. */
  contactEmail?: string;
}

function Group({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-6 w-full border-b border-border pb-3 text-label uppercase text-accent">
        {legend}
      </legend>
      <div className="grid gap-6 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

const fieldId = (name: string) => `quote-${name}`;

export function ContactForm({ contactEmail }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const renderedAt = useRef(0);

  const [values, setValues] = useState<QuoteFormValues>(emptyQuoteValues);
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [botValue, setBotValue] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  // Timing check: the server drops submissions that arrive seconds after render.
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function focusFirstInvalid(fieldErrors: QuoteFieldErrors) {
    const first = quoteFieldOrder.find((name) => fieldErrors[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${fieldId(first)}`)?.focus();
  }

  function handleChange(name: string, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);

    // Once a field has been flagged, clear its error as soon as it becomes valid.
    if (attempted && errors[name as QuoteFieldName]) {
      const result = quoteSchema.safeParse(next);
      const message = result.success ? undefined : getFieldErrors(result.error)[name as QuoteFieldName];
      setErrors((prev) => ({ ...prev, [name]: message }));
    }
  }

  // After the first submit attempt, validate each field as the user leaves it.
  function handleBlur(name: string) {
    if (!attempted) return;
    const result = quoteSchema.safeParse(values);
    const message = result.success ? undefined : getFieldErrors(result.error)[name as QuoteFieldName];
    setErrors((prev) => ({ ...prev, [name]: message }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;

    setAttempted(true);
    const result = quoteSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = getFieldErrors(result.error);
      setErrors(fieldErrors);
      setStatus("idle");
      focusFirstInvalid(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("pending");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          [BOT_FIELD_NAME]: botValue,
          renderedAt: renderedAt.current,
        }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      // The server re-validates; show its field errors if it disagreed with us.
      if (response.status === 400) {
        const data: { errors?: QuoteFieldErrors } = await response.json().catch(() => ({}));
        if (data.errors && Object.keys(data.errors).length > 0) {
          setErrors(data.errors);
          setStatus("idle");
          focusFirstInvalid(data.errors);
          return;
        }
      }

      setStatus("error");
    } catch {
      // Network failure — the form keeps everything the visitor typed.
      setStatus("error");
    }
  }

  const pending = status === "pending";

  return (
    <div>
      {/* Persistent live region: status messages are announced when they appear. */}
      <div aria-live="polite">
        {status === "success" && (
          <div className="border border-accent/40 bg-card p-8 md:p-12">
            <h2 ref={successRef} tabIndex={-1} className="text-h2 uppercase outline-none">
              PROJECT REQUEST RECEIVED
            </h2>
            <p className="mt-6 max-w-prose text-text-secondary">
              Thanks for reaching out. We&apos;ve received your project details and will get back
              to you shortly.
            </p>
          </div>
        )}
        {status === "error" && (
          <p className="mb-8 border border-[#ff6b6b] bg-card p-4 text-sm text-text">
            Something went wrong. Please try again or contact us directly.
            {contactEmail && (
              <>
                {" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-accent underline underline-offset-4"
                >
                  {contactEmail}
                </a>
              </>
            )}
          </p>
        )}
      </div>

      {status !== "success" && (
        <>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={pending}
            className="space-y-12"
          >
            <Group legend="You">
              <TextField
                id={fieldId("name")}
                name="name"
                label="Name"
                required
                autoComplete="name"
                maxLength={limits.name}
                value={values.name}
                error={errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                id={fieldId("email")}
                name="email"
                label="Email"
                type="email"
                inputMode="email"
                required
                autoComplete="email"
                maxLength={limits.email}
                value={values.email}
                error={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                id={fieldId("phone")}
                name="phone"
                label="Phone / WhatsApp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={limits.phone}
                value={values.phone}
                error={errors.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Group>

            <Group legend="Business">
              <TextField
                id={fieldId("company")}
                name="company"
                label="Company / Brand"
                autoComplete="organization"
                maxLength={limits.company}
                value={values.company}
                error={errors.company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                id={fieldId("website")}
                name="website"
                label="Website / Social profile"
                inputMode="url"
                autoComplete="off"
                maxLength={limits.website}
                value={values.website}
                error={errors.website}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Group>

            <Group legend="Project">
              <SelectField
                id={fieldId("service")}
                name="service"
                label="Service"
                required
                options={serviceOptions}
                value={values.service}
                error={errors.service}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <SelectField
                id={fieldId("projectType")}
                name="projectType"
                label="Project type"
                options={projectTypeOptions}
                value={values.projectType}
                error={errors.projectType}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <SelectField
                id={fieldId("videoCount")}
                name="videoCount"
                label="Number of videos"
                options={videoCountOptions}
                value={values.videoCount}
                error={errors.videoCount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <SelectField
                id={fieldId("videoLength")}
                name="videoLength"
                label="Estimated video length"
                options={durationOptions}
                value={values.videoLength}
                error={errors.videoLength}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <SelectField
                id={fieldId("budget")}
                name="budget"
                label="Budget"
                options={budgetOptions}
                value={values.budget}
                error={errors.budget}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <SelectField
                id={fieldId("timeline")}
                name="timeline"
                label="Timeline"
                options={timelineOptions}
                value={values.timeline}
                error={errors.timeline}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextAreaField
                id={fieldId("description")}
                name="description"
                label="Project description"
                required
                rows={6}
                maxLength={limits.description}
                hint="What are you making, who is it for, and what should the finished video do?"
                className="md:col-span-2"
                value={values.description}
                error={errors.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextAreaField
                id={fieldId("links")}
                name="links"
                label="Reference links"
                rows={3}
                maxLength={limits.links}
                hint="Videos or channels whose style you like, or a link to your footage."
                className="md:col-span-2"
                value={values.links}
                error={errors.links}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextAreaField
                id={fieldId("notes")}
                name="notes"
                label="Anything else"
                rows={3}
                maxLength={limits.notes}
                className="md:col-span-2"
                value={values.notes}
                error={errors.notes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Group>

            {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
            >
              <label>
                Nickname
                <input
                  type="text"
                  name={BOT_FIELD_NAME}
                  tabIndex={-1}
                  autoComplete="off"
                  value={botValue}
                  onChange={(event) => setBotValue(event.target.value)}
                />
              </label>
            </div>

            <div>
              <Button type="submit" arrow={!pending} disabled={pending}>
                {pending ? "Sending…" : "Send Project Request"}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
