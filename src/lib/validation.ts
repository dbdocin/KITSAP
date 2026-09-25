import { z } from "zod";
import {
  budgetOptions,
  durationOptions,
  projectTypeOptions,
  serviceOptions,
  timelineOptions,
  videoCountOptions,
} from "@/data/form-options";

/** Max lengths — also enforced by `maxLength` on the inputs and by the API's body-size cap. */
export const limits = {
  name: 100,
  email: 254,
  phone: 30,
  company: 150,
  website: 300,
  description: 5000,
  links: 2000,
  notes: 3000,
} as const;

const tooLong = (max: number) => `Please keep this under ${max.toLocaleString("en-US")} characters.`;

/** Optional free text: trimmed; a missing value becomes an empty string. */
const optionalText = (max: number) =>
  z
    .string({ error: "Please enter text only." })
    .trim()
    .max(max, tooLong(max))
    .optional()
    .transform((value) => value ?? "");

/** Optional select: empty, missing, or one of the allowed options. */
const optionalChoice = <T extends readonly [string, ...string[]]>(options: T) =>
  z
    .union([z.enum(options), z.literal("")], { error: "Please choose one of the options." })
    .optional()
    .transform((value) => value ?? "");

export const quoteSchema = z.object({
  name: z
    .string({ error: "Please enter your name." })
    .trim()
    .min(1, "Please enter your name.")
    .max(limits.name, tooLong(limits.name)),
  email: z
    .string({ error: "Please enter your email address." })
    .trim()
    .min(1, "Please enter your email address.")
    .max(limits.email, tooLong(limits.email))
    .pipe(z.email({ error: "Please enter a valid email address." })),
  phone: z
    .string({ error: "Please enter a valid phone number." })
    .trim()
    .max(limits.phone, tooLong(limits.phone))
    .regex(/^[0-9+()\-.\s]*$/, "Please enter a valid phone number, using digits and + ( ) - only.")
    .optional()
    .transform((value) => value ?? ""),
  company: optionalText(limits.company),
  website: optionalText(limits.website),
  service: z.enum(serviceOptions, { error: "Please choose a service." }),
  projectType: optionalChoice(projectTypeOptions),
  videoCount: optionalChoice(videoCountOptions),
  videoLength: optionalChoice(durationOptions),
  budget: optionalChoice(budgetOptions),
  timeline: optionalChoice(timelineOptions),
  description: z
    .string({ error: "Please tell us about your project." })
    .trim()
    .min(1, "Please tell us about your project.")
    .min(10, "Please add a little more detail, at least a sentence or two.")
    .max(limits.description, tooLong(limits.description)),
  links: optionalText(limits.links),
  notes: optionalText(limits.notes),
});

/** Validated, trimmed data (what the server and email use). */
export type QuoteData = z.infer<typeof quoteSchema>;

/** Raw form state: every field is a string until validated. */
export type QuoteFormValues = { [K in keyof QuoteData]: string };
export type QuoteFieldName = keyof QuoteData;

/** DOM order — used to focus the first invalid field. */
export const quoteFieldOrder: readonly QuoteFieldName[] = [
  "name",
  "email",
  "phone",
  "company",
  "website",
  "service",
  "projectType",
  "videoCount",
  "videoLength",
  "budget",
  "timeline",
  "description",
  "links",
  "notes",
];

export const emptyQuoteValues: QuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  service: "",
  projectType: "",
  videoCount: "",
  videoLength: "",
  budget: "",
  timeline: "",
  description: "",
  links: "",
  notes: "",
};

export type QuoteFieldErrors = Partial<Record<QuoteFieldName, string>>;

/** First error message per field. */
export function getFieldErrors(error: z.ZodError): QuoteFieldErrors {
  const errors: QuoteFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && key in emptyQuoteValues && !(key in errors)) {
      errors[key as QuoteFieldName] = issue.message;
    }
  }
  return errors;
}

/** Bot-check fields sent alongside the form data (not part of the quote itself). */
export const BOT_FIELD_NAME = "nickname";
export const MIN_FILL_TIME_MS = 3000;
