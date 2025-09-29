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
    // --- 1) Parse incoming data (JSON or form) ---
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
    if (company) return NextResponse.json({ ok: true }, { status: 200 });
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // --- 2) Send the lead to YOU ---
    await resend.emails.send({
      from: "noreply@matthewjamescarbonell.com",   // your domain sender
      to: process.env.CONTACT_TO!,                 // your inbox
      replyTo: email,                              // user’s address
      subject: `New message from ${name}`,
      html: renderHtml({ name, email, message }),
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    // --- 3) Auto-reply to THEM (minimal + debug) ---
    let autoReplySent = false;
    try {
      await resend.emails.send({
        from: "noreply@matthewjamescarbonell.com",         // your domain sender
        to: email,                                         // the user
        replyTo: String(process.env.CONTACT_TO || ""),      // replies go to you
        subject: "Thanks — I got your message",
        text: `Hi ${name || "there"},\n\nThanks for reaching out — I received your message and will get back to you soon.\n\n— Matthew`,
      });
      autoReplySent = true;
    } catch (e) {
      console.error("[/api/contact] auto-reply failed:", e);
    }

    // --- 4) Respond to the browser (note the debug flag) ---
    return NextResponse.json({ ok: true, autoReplySent }, { status: 200 });

  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
