import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

// TEMP: echo the sender env so we can verify prod is using your domain
// app/api/contact/route.ts
export async function GET() {
  return NextResponse.json({
    ok: true,
    method: "GET",
    envFrom: process.env.RESEND_FROM || null, // TEMP
  });
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let name = "", email = "", message = "", company = "";

    if (ct.includes("application/json")) {
      const body = await req.json();
      ({ name = "", email = "", message = "", company = "" } = body);
    } else {
      const form = await req.formData();
      name = String(form.get("name") || "");
      email = String(form.get("email") || "");
      message = String(form.get("message") || "");
      company = String(form.get("company") || "");
    }

    if (company) return NextResponse.json({ ok: true }); // honeypot
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

await resend.emails.send({
  from: process.env.RESEND_FROM!,
  to: process.env.CONTACT_TO!,
  replyTo: email,                      // ← camelCase for Node SDK
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
