// Options for the quote form (used in Phase 3).
// Each list is `as const` so the values can drive the shared zod schema.

export const serviceOptions = [
  "Video Editing",
  "Reels & Short-Form",
  "Podcast Editing",
  "Creative & Motion",
  "Not sure yet",
] as const;

export const projectTypeOptions = [
  "YouTube",
  "Reels",
  "Commercial",
  "Corporate",
  "Podcast",
  "Events",
  "Other",
] as const;

// DECIDE: currency (USD / INR / both)
export const budgetOptions = [
  "Under $100",
  "$100–$500",
  "$500–$1,000",
  "$1,000–$5,000",
  "$5,000+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 1 week",
  "Within 2 weeks",
  "Within a month",
  "Flexible",
] as const;

export const durationOptions = [
  "Under 1 minute",
  "1–3 minutes",
  "3–10 minutes",
  "10–30 minutes",
  "30+ minutes",
  "Not sure yet",
] as const;
