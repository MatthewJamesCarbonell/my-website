// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper for your lead email body
function renderHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>New website message</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <hr />
      <pre style="white-space:pre-wrap;margin:0">${message}</pre>
    </div>
  `;
}

// Visible version tag so we can confirm the live build
export async function GET() {
  return NextResponse.json(
    { ok: true, method: "GET", v: "apr-debug-3" },
    { status: 200 }
  );
}

// Allow preflight if ever needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(req: Request) {
  try {
    // --- Parse input (JSON or form) ---
    const ct = req.headers.get("content-type") || "";
    let name = "", email = "", message = "", company = "";
    if (ct.includes("application/json")) {
      const body = await req.json();
      name = String(body.name || "");
      email = String(body.email || "");
      message = String(body.message || "");
      company = String(body.company || "");
    } else {
      const form = await req.formData();
      name = String(form.get("name") || "");
      email = String(form.get("email") || "");
      message = String(form.get("message") || "");
      company = String(form.get("company") || "");
    }

    // Honeypot (bots fill hidden field)
    if (company) return NextResponse.json({ ok: true, v: "apr-debug-3", honeypot: true }, { status: 200 });
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, v: "apr-debug-3", error: "Missing fields" }, { status: 400 });
    }

    // --- 1) Send the lead to YOU ---
    let leadId: string | null = null;
    try {
      const leadRes = await resend.emails.send({
        from: "noreply@matthewjamescarbonell.com",
        to: process.env.CONTACT_TO!,
        replyTo: email,
        subject: `New message from ${name}`,
        html: renderHtml({ name, email, message }),
        text: `From: ${name} <${email}>\n\n${message}`,
      });
      leadId = (leadRes as any)?.id ?? null;
    } catch (e) {
      console.error("[/api/contact] lead send failed:", e);
      return NextResponse.json({ ok: false, v: "apr-debug-3", stage: "lead", error: String(e) }, { status: 500 });
    }

    // --- 2) Auto-reply to THEM (forced for debug) ---
    let autoReplySent = false;
    let autoId: string | null = null;
    try {
      const autoRes = await resend.emails.send({
        from: "noreply@matthewjamescarbonell.com", // your domain sender
        to: email,                                  // the user
        replyTo: String(process.env.CONTACT_TO || ""),
        subject: "Thanks — I got your message",
        text: `Hi ${name || "there"},\n\nThanks for reaching out — I received your message and will get back to you soon.\n\n— Matthew`,
      });
      autoId = (autoRes as any)?.id ?? null;
      autoReplySent = Boolean(autoId);
    } catch (e) {
      console.error("[/api/contact] auto-reply failed:", e);
      // Return OK for the user, but include debug info
      return NextResponse.json(
        { ok: true, v: "apr-debug-3", autoReplySent: false, autoError: String(e), leadId },
        { status: 200 }
      );
    }

    // --- 3) Return unmistakable debug payload ---
    return NextResponse.json(
      { ok: true, v: "apr-debug-3", autoReplySent, autoId, leadId },
      { status: 200 }
    );

  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json({ ok: false, v: "apr-debug-3", error: "Send failed" }, { status: 500 });
  }
}
