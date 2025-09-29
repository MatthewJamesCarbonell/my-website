import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";          // ensure Node runtime on Vercel
export const dynamic = "force-dynamic";   // don't pre-render this route

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------- HTML helper ----------
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
// 1) Put this helper near the top of route.ts (above GET/POST):
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]!));
}

// Simple sanity check in browser/curl
export async function GET() {
  return NextResponse.json({ ok: true, method: "GET" }, { status: 200 });
}

// Allow CORS preflight if ever needed
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

    if (company) return NextResponse.json({ ok: true, honeypot: true }, { status: 200 });
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // --- Send to YOU ---
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
      return NextResponse.json({ ok: false, stage: "lead", error: String(e) }, { status: 500 });
    }

    // --- Auto-reply (minimal) ---
    let autoReplySent = false;
    let autoId: string | null = null;
    try {
      const autoRes = await resend.emails.send({
        from: "noreply@matthewjamescarbonell.com",
        to: email,
        replyTo: String(process.env.CONTACT_TO || ""),
        subject: "Thanks — I got your message",
        text: `Hi ${name || "there"},\n\nThanks for reaching out — I received your message and will get back to you soon.\n\n— Matthew`,
      });
      autoId = (autoRes as any)?.id ?? null;
      autoReplySent = true;
    } catch (e) {
      console.error("[/api/contact] auto-reply failed:", e);
      // We’ll still return ok:true so your user sees success, but include the error
      return NextResponse.json({
        ok: true,
        leadId,
        autoReplySent: false,
        autoError: String(e),
      }, { status: 200 });
    }

    // --- Final response ---
    return NextResponse.json({
      ok: true,
      leadId,
      autoReplySent,
      autoId,
    }, { status: 200 });

  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
