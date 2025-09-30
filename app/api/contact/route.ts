// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple HTML body for your lead email
function renderHtml({
  name,
  email,
  message,
}: { name: string; email: string; message: string }) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>New website message</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <hr />
      <pre style="white-space:pre-wrap;margin:0">${message}</pre>
    </div>
  `;
}

export async function GET() {
  // remove debug tag; keep a simple health-check
  return NextResponse.json({ ok: true, method: "GET" }, { status: 200 });
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(req: Request) {
  try {
    // Parse JSON or form
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

    // Honeypot
    if (company) return NextResponse.json({ ok: true }, { status: 200 });
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // 1) Lead to YOU
    await resend.emails.send({
      from: "noreply@matthewjamescarbonell.com",
      to: process.env.CONTACT_TO!,
      replyTo: email,
      subject: `New message from ${name}`,
      html: renderHtml({ name, email, message }),
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    // 2) Friendly auto-reply to THEM (guarded)
    try {
      const contactTo = String(process.env.CONTACT_TO || "").toLowerCase();
      const isNoReply =
        /no[-_.]?reply@/i.test(email) || /mailer-daemon@|postmaster@/i.test(email);
      const isSameAsYou = email.toLowerCase() === contactTo;

      if (!isNoReply && !isSameAsYou) {
        await resend.emails.send({
          from: "noreply@matthewjamescarbonell.com",   // your domain sender
          to: email,                                   // the user
          replyTo: contactTo,                          // replies go to you
          subject: "Thanks — I got your message",
          headers: {
            // help avoid auto-reply loops with other systems
            "Auto-Submitted": "auto-generated",
            "X-Auto-Response-Suppress": "All",
            "Precedence": "bulk",
          },
          text:
            `Hi ${name || "there"},

Thanks for reaching out! I received your message and will get back to you soon.

— Matthew
matthewjamescarbonell.com`,
        });
      }
    } catch (e) {
      console.error("[/api/contact] auto-reply failed:", e);
      // continue; user already got success
    }

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
