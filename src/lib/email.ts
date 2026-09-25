/**
 * All email-provider code lives in this file (Resend), so the provider can be
 * swapped without touching the API route or the form.
 *
 * Server-only: never import this from a client component.
 */
import { Resend } from "resend";
import type { QuoteData } from "@/lib/validation";

/** Thrown when required environment variables are missing. */
export class EmailConfigError extends Error {
  constructor(public readonly missing: string[]) {
    super(`Email is not configured. Missing environment variables: ${missing.join(", ")}`);
    this.name = "EmailConfigError";
  }
}

interface EmailConfig {
  apiKey: string | undefined;
  to: string | undefined;
  from: string | undefined;
  sendConfirmation: boolean;
}

function readConfig(): EmailConfig {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() || undefined,
    to: process.env.CONTACT_EMAIL?.trim() || undefined,
    from: process.env.EMAIL_FROM?.trim() || undefined,
    sendConfirmation: process.env.SEND_CONFIRMATION_EMAIL?.trim().toLowerCase() === "true",
  };
}

interface OutgoingEmail {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}

/* -------------------------------------------------------------------------- */
/* Formatting helpers                                                          */
/* -------------------------------------------------------------------------- */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escaped, with line breaks preserved. */
function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>");
}

/** Single-line, control-character-free text, safe for use in a subject header. */
function toSingleLine(value: string, maxLength: number): string {
  const cleaned = value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength - 1)}…` : cleaned;
}

interface Field {
  label: string;
  value: string;
  multiline?: boolean;
}

interface Section {
  title: string;
  fields: Field[];
}

function buildSections(data: QuoteData): Section[] {
  const sections: Section[] = [
    {
      title: "Contact",
      fields: [
        { label: "Name", value: data.name },
        { label: "Email", value: data.email },
        { label: "Phone / WhatsApp", value: data.phone },
        { label: "Company / Brand", value: data.company },
        { label: "Website / Social", value: data.website },
      ],
    },
    {
      title: "Project",
      fields: [
        { label: "Service", value: data.service },
        { label: "Project type", value: data.projectType },
        { label: "Number of videos", value: data.videoCount },
        { label: "Estimated length", value: data.videoLength },
        { label: "Budget", value: data.budget },
        { label: "Timeline", value: data.timeline },
      ],
    },
    {
      title: "Description",
      fields: [{ label: "", value: data.description, multiline: true }],
    },
    {
      title: "Reference links",
      fields: [{ label: "", value: data.links, multiline: true }],
    },
    {
      title: "Additional info",
      fields: [{ label: "", value: data.notes, multiline: true }],
    },
  ];

  // Omit empty fields, and sections left with nothing in them.
  return sections
    .map((section) => ({ ...section, fields: section.fields.filter((field) => field.value) }))
    .filter((section) => section.fields.length > 0);
}

/* -------------------------------------------------------------------------- */
/* Templates                                                                   */
/* -------------------------------------------------------------------------- */

const COLORS = {
  ink: "#080808",
  accent: "#c8ff3d",
  page: "#f2f2f0",
  card: "#ffffff",
  text: "#161616",
  muted: "#666666",
  line: "#e3e3e0",
};

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function layout(bodyHtml: string, preheader: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>KITSAP</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.page};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">
<tr><td style="background:${COLORS.ink};padding:24px 32px;border-bottom:3px solid ${COLORS.accent};">
<span style="font-family:${FONT};font-size:20px;font-weight:700;letter-spacing:6px;color:#f5f5f5;">KITSAP</span>
</td></tr>
<tr><td style="background:${COLORS.card};padding:32px;font-family:${FONT};font-size:15px;line-height:1.6;color:${COLORS.text};">
${bodyHtml}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function renderNotificationHtml(data: QuoteData): string {
  const body = buildSections(data)
    .map((section) => {
      const rows = section.fields
        .map((field) => {
          const value = field.multiline ? escapeMultiline(field.value) : escapeHtml(field.value);
          if (!field.label) {
            return `<div style="font-size:15px;line-height:1.6;color:${COLORS.text};">${value}</div>`;
          }
          return `<tr>
<td valign="top" style="padding:6px 16px 6px 0;width:150px;font-size:13px;color:${COLORS.muted};">${escapeHtml(field.label)}</td>
<td valign="top" style="padding:6px 0;font-size:15px;color:${COLORS.text};">${value}</td>
</tr>`;
        })
        .join("\n");

      const isTable = section.fields.some((field) => field.label);
      const content = isTable
        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`
        : rows;

      return `<div style="margin:0 0 28px;">
<div style="margin:0 0 10px;padding-bottom:8px;border-bottom:1px solid ${COLORS.line};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${COLORS.muted};">${escapeHtml(section.title)}</div>
${content}
</div>`;
    })
    .join("\n");

  return layout(
    `<h1 style="margin:0 0 24px;font-size:22px;line-height:1.3;color:${COLORS.text};">New project request</h1>
${body}
<p style="margin:8px 0 0;font-size:13px;color:${COLORS.muted};">Reply to this email to respond directly to the sender.</p>`,
    `New project request from ${toSingleLine(data.name, 60)}`,
  );
}

function renderNotificationText(data: QuoteData): string {
  const parts = buildSections(data).map((section) => {
    const lines = section.fields.map((field) =>
      field.label ? `${field.label}: ${field.value}` : field.value,
    );
    return `${section.title.toUpperCase()}\n${lines.join("\n")}`;
  });

  return `NEW PROJECT REQUEST\n\n${parts.join("\n\n")}\n\nReply to this email to respond directly to the sender.\n`;
}

/** Static copy only — this email must never contain anything the submitter typed. */
const CONFIRMATION_SUBJECT = "We received your KITSAP project request";
const CONFIRMATION_TEXT =
  "Thanks for reaching out to KITSAP.\n\nWe've received your project request. Our team will review it and get back to you with the next steps.\n\nKITSAP\n";

function renderConfirmationHtml(): string {
  return layout(
    `<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:${COLORS.text};">Project request received</h1>
<p style="margin:0 0 16px;">Thanks for reaching out to KITSAP.</p>
<p style="margin:0;">We&#39;ve received your project request. Our team will review it and get back to you with the next steps.</p>`,
    "We received your project request.",
  );
}

/* -------------------------------------------------------------------------- */
/* Sending                                                                     */
/* -------------------------------------------------------------------------- */

async function deliver(resend: Resend, email: OutgoingEmail): Promise<void> {
  const { error } = await resend.emails.send({
    from: email.from,
    to: email.to,
    replyTo: email.replyTo,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });

  if (error) {
    throw new Error(`Resend rejected the email: ${error.name} — ${error.message}`);
  }
}

function logDevEmail(label: string, email: Omit<OutgoingEmail, "html">): void {
  console.info(
    [
      `[email:dev] ${label}`,
      `  To:       ${email.to}`,
      `  From:     ${email.from}`,
      email.replyTo ? `  Reply-To: ${email.replyTo}` : null,
      `  Subject:  ${email.subject}`,
      "  ---",
      email.text
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n"),
    ]
      .filter((line) => line !== null)
      .join("\n"),
  );
}

/**
 * Sends the quote notification to KITSAP (and, if enabled, a confirmation to the
 * sender). Throws if the notification could not be sent; a failed confirmation
 * is only logged.
 */
export async function sendQuoteEmail(data: QuoteData): Promise<void> {
  const config = readConfig();
  const isProduction = process.env.NODE_ENV === "production";

  // Development without a key: show what would have been sent.
  if (!config.apiKey && !isProduction) {
    console.warn(
      "[email:dev] RESEND_API_KEY is not set — printing the email to this console instead of sending it.",
    );
    const to = config.to ?? "(CONTACT_EMAIL not set)";
    const from = config.from ?? "(EMAIL_FROM not set)";

    logDevEmail("Notification", {
      from,
      to,
      replyTo: data.email,
      subject: notificationSubject(data),
      text: renderNotificationText(data),
    });
    if (config.sendConfirmation) {
      logDevEmail("Confirmation", {
        from,
        to: data.email,
        replyTo: config.to,
        subject: CONFIRMATION_SUBJECT,
        text: CONFIRMATION_TEXT,
      });
    }
    return;
  }

  const missing: string[] = [];
  if (!config.apiKey) missing.push("RESEND_API_KEY");
  if (!config.to) missing.push("CONTACT_EMAIL");
  if (!config.from) missing.push("EMAIL_FROM");
  if (!config.apiKey || !config.to || !config.from) throw new EmailConfigError(missing);

  const resend = new Resend(config.apiKey);

  await deliver(resend, {
    from: config.from,
    to: config.to,
    replyTo: data.email,
    subject: notificationSubject(data),
    html: renderNotificationHtml(data),
    text: renderNotificationText(data),
  });

  if (config.sendConfirmation) {
    try {
      await deliver(resend, {
        from: config.from,
        to: data.email,
        replyTo: config.to,
        subject: CONFIRMATION_SUBJECT,
        html: renderConfirmationHtml(),
        text: CONFIRMATION_TEXT,
      });
    } catch (error) {
      // The request itself already reached KITSAP, so this must not fail it.
      console.error("[email] Confirmation email failed (notification was sent):", error);
    }
  }
}

function notificationSubject(data: QuoteData): string {
  return `New project request — ${toSingleLine(data.name, 80)} (${toSingleLine(data.service, 60)})`;
}
