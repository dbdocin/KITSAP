import { NextResponse } from "next/server";
import { EmailConfigError, sendQuoteEmail } from "@/lib/email";
import {
  BOT_FIELD_NAME,
  MIN_FILL_TIME_MS,
  getFieldErrors,
  quoteSchema,
} from "@/lib/validation";

// Node runtime: the email provider SDK is not designed for the edge runtime.
export const runtime = "nodejs";

/** Request bodies larger than this are rejected (the form is ~15 KB at its absolute maximum). */
const MAX_BODY_BYTES = 20 * 1024;

const jsonError = (status: number, error: string, extra?: Record<string, unknown>) =>
  NextResponse.json({ ok: false, error, ...extra }, { status });

/** Reads the request body, giving up as soon as it grows past the limit. */
async function readBodyWithLimit(request: Request, limit: number): Promise<string | null> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > limit) return null;

  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;

    received += value.byteLength;
    if (received > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  return Buffer.concat(chunks).toString("utf8");
}

export async function POST(request: Request) {
  // EXTENSION POINT — rate limiting.
  // In-memory counters do not work on Vercel serverless (each invocation may run
  // in a fresh instance), so none is implemented here. If spam becomes a problem,
  // add an Upstash Redis rate limit at this spot; see "Rate limiting" in README.md.
  //
  //   const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  //   const { success } = await ratelimit.limit(ip);
  //   if (!success) return jsonError(429, "Too many requests. Please try again later.");

  // Requiring JSON means a cross-site page cannot post here with a plain <form>
  // or a "simple" fetch — the browser would have to send a CORS preflight first.
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonError(415, "Unsupported content type.");
  }

  // 1. Oversized bodies.
  const raw = await readBodyWithLimit(request, MAX_BODY_BYTES);
  if (raw === null) return jsonError(413, "Request is too large.");

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonError(400, "Invalid request.");
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return jsonError(400, "Invalid request.");
  }
  const payload = body as Record<string, unknown>;

  // Bots get the same success response a person would, so they learn nothing.
  const silentSuccess = () => NextResponse.json({ ok: true });

  // 2. Honeypot: a real person never sees or fills this field.
  const honeypot = payload[BOT_FIELD_NAME];
  if (typeof honeypot === "string" ? honeypot.trim() !== "" : honeypot !== undefined) {
    return silentSuccess();
  }

  // 3. Timing: forms submitted within a few seconds of rendering are not human.
  // A missing or malformed timestamp counts as a bot. Only a timestamp that is
  // not in the future is judged "too fast", so a visitor whose clock runs ahead
  // of the server's is never wrongly dropped.
  const renderedAt = payload.renderedAt;
  if (typeof renderedAt !== "number" || !Number.isFinite(renderedAt)) return silentSuccess();
  const elapsed = Date.now() - renderedAt;
  if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) return silentSuccess();

  // 4. Validation, with the same schema the form uses in the browser.
  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonError(400, "Please check the form and try again.", {
      errors: getFieldErrors(parsed.error),
    });
  }

  // 5. Send. Provider details are logged here and never returned to the client.
  try {
    await sendQuoteEmail(parsed.data);
  } catch (error) {
    if (error instanceof EmailConfigError) {
      console.error(`[api/quote] ${error.message}. Quote requests cannot be delivered until this is fixed.`);
    } else {
      console.error("[api/quote] Failed to send quote email:", error);
    }
    return jsonError(500, "Something went wrong. Please try again later.");
  }

  // 6. Done.
  return NextResponse.json({ ok: true });
}
