import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";          // Resend needs Node (not Edge)
export const dynamic = "force-dynamic";   // don’t let Vercel pre-render this

const resend = new Resend(process.env.RESEND_API_KEY);

function renderHtml({ name, email, message }: { name: string; email: string; message: string }) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>New website message</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <hr />
      <pre style="white-space:pre-wrap;margin:0">${message}</pre>
    </div>
  `;
}

// Helpful for checking the route from a browser
export async function GET() {
  return NextResponse.json({ ok: true, method: "GET" }, { status: 200 });
}

// Allow preflight if the browser ever does it
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let name = "", email = "", message = "", company = "";

    if (ct.includes("application/json")) {
      const body = await req.json();
      name = String(body.name || "");
      email = String(body.email || "");
      message = String(body.message || "");
      company = String(body.company || "");
    } else {
      // Handles application/x-www-form-urlencoded or multipart/form-data
      const form = await req.formData();
      name = String(form.get("name") || "");
      email = String(form.get("email") || "");
      message = String(form.get("message") || "");
      company = String(form.get("company") || "");
    }

    // Honeypot: if bots fill this, silently succeed
    if (company) return NextResponse.json({ ok: true }, { status: 200 });

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM!,    // e.g. "Matthew <onboarding@resend.dev>" or your domain later
      to: process.env.CONTACT_TO!,
      replyTo: email,                    // so you can reply directly
      subject: `New message from ${name}`,
      html: renderHtml({ name, email, message }),
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}