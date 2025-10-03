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

function escapeHtml(value: string) {
  const replacements: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return String(value).replace(/[&<>"']/g, (character) => replacements[character]);
}

const signatureHtml = `
<table class="signature_tbl" cellpadding="0" cellspacing="0" border="0" style="margin:0.1px;border-collapse:collapse;font-size:10px;font-family:Inter,sans-serif;">
  <tbody>
    <tr>
      <td class="layout_maintd" style="margin:0.1px;line-height:14px;font-family:Arial, Helvetica, sans-serif;border-collapse:collapse;">
        <table cellpadding="0" cellspacing="0" style="margin:0.1px;border-collapse:separate;">
          <tbody>
            <tr>
              <td valign="top" align="left" class="layout_border" style="margin:0.1px;border-collapse:collapse;padding:25px;border-radius:5px;border-width:1px;border-color:#e2e2e2;border-style:solid;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td align="left" valign="middle" style="margin:0.1px;padding:0 15px 0 0;display:revert;">
                        <img style="display:block;border-radius:0px;" src="https://customesignature.s3.us-west-1.amazonaws.com/upload/signature/profile/1756407423-13090-square.gif" width="120" alt="Matthew Carbonell" />
                      </td>
                      <td align="left" valign="middle" class="layout_divider" style="margin:0.1px;border-collapse:collapse;border-left-width:1px;border-left-color:#e2e2e2;border-left-style:solid;padding:0 0 0 15px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0.1px;border-collapse:separate;">
                          <tbody>
                            <tr>
                              <td style="margin:0.1px;border-collapse:collapse;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <td align="left" valign="top">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tbody>
                                            <tr>
                                              <td align="left" valign="top" style="margin:0.1px;border-collapse:collapse;">
                                                <a href="https://www.matthewjamescarbonell.com" style="display:inline-block;">
                                                  <img src="https://app.customesignature.com/r/197934/logo" width="45" style="margin:0.1px;display:block;" alt="Matthew Carbonell logo" />
                                                </a>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="margin:0.1px;border-collapse:collapse;padding-bottom:10px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                  <tbody>
                                                    <tr>
                                                      <td align="left" valign="middle" style="margin:0.1px;">
                                                        <span style="font-weight:normal;font-style:normal;color:#000000;font-size:18px;white-space:nowrap;">Matthew Carbonell</span>
                                                      </td>
                                                      <td align="left" valign="middle" style="margin:0.1px;padding-left:5px;">
                                                        <img width="15" height="15" src="https://app.customesignature.com/images/verify.gif" style="margin:0.1px;display:block;" alt="Verified" />
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="margin:0.1px;border-collapse:collapse;">
                                                <span style="font-weight:normal;font-style:normal;color:#000000;font-size:12px;">Advocate | Enterpriser | Organizer</span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="margin:0.1px;border-collapse:collapse;">
                                        <span style="font-weight:normal;font-style:normal;color:#8b8b8b;font-size:10px;">Phone:</span>
                                        <a href="tel:3057642999" style="font-weight:normal;font-style:normal;color:#000000;font-size:12px;text-decoration:none;">305-764-2999</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="margin:0.1px;border-collapse:collapse;">
                                        <span style="font-weight:normal;font-style:normal;color:#8b8b8b;font-size:10px;">Email:</span>
                                        <a href="mailto:matthewjamescarbonell@gmail.com" style="font-weight:normal;font-style:normal;color:#000000;font-size:12px;text-decoration:none;">matthewjamescarbonell@gmail.com</a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td width="15" align="left" valign="top">&nbsp;</td>
                              <td align="left" valign="middle" style="margin:0.1px;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0.1px;border-collapse:collapse;">
                                  <tbody>
                                    <tr>
                                      <td style="padding:5px 0 0 0;margin:0.1px;">
                                        <a href="https://www.matthewjamescarbonell.com" target="_blank" rel="noopener">
                                          <img alt="Website" src="https://customesignature.s3.us-west-1.amazonaws.com/images/social/animation/4/web-icon.gif" width="30" style="display:block;" />
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding:5px 0 0 0;margin:0.1px;">
                                        <a href="https://app.customesignature.com/r/197938" target="_blank" rel="noopener">
                                          <img alt="Instagram" src="https://customesignature.s3.us-west-1.amazonaws.com/images/social/animation/4/insta-icon.gif" width="30" style="display:block;" />
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding:5px 0 0 0;margin:0.1px;">
                                        <a href="https://app.customesignature.com/r/197939" target="_blank" rel="noopener">
                                          <img alt="LinkedIn" src="https://customesignature.s3.us-west-1.amazonaws.com/images/social/animation/4/linkedin-icon.gif" width="30" style="display:block;" />
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding:5px 0 0 0;margin:0.1px;">
                                        <a href="https://app.customesignature.com/r/197940" target="_blank" rel="noopener">
                                          <img alt="WhatsApp" src="https://customesignature.s3.us-west-1.amazonaws.com/images/social/animation/4/whatsapp-icon.gif" width="30" style="display:block;" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td style="margin:0.1px;padding:10px 0 0 0;">
        <a href="https://app.customesignature.com/r/197937/banner" target="_blank" rel="noopener">
          <img src="https://app.customesignature.com/r/197937/banner" width="150" style="margin:0.1px;border-radius:0px;display:inline;" alt="Banner" />
        </a>
      </td>
    </tr>
  </tbody>
</table>`;

function renderAutoReplyHtml(name: string) {
  const displayName = name?.trim() ? name.trim() : "there";
  const safeName = escapeHtml(displayName);

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#0f172a;">
      <p style="margin:0 0 12px 0;">Hi ${safeName},</p>
      <p style="margin:0 0 12px 0;">Thanks for reaching out! I received your message and will get back to you soon.</p>
      <p style="margin:0 0 24px 0;">Warmly,<br/>Matthew</p>
      <div>${signatureHtml}</div>
    </div>
  `;
}

function renderAutoReplyText(name: string) {
  const displayName = name?.trim() ? name.trim() : "there";

  return `Hi ${displayName},

Thanks for reaching out! I received your message and will get back to you soon.

—
Matthew Carbonell
Advocate | Enterpriser | Organizer
Phone: 305-764-2999
Email: matthewjamescarbonell@gmail.com
matthewjamescarbonell.com`;
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
        const autoReplyHtml = renderAutoReplyHtml(name);
        const autoReplyText = renderAutoReplyText(name);

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
          html: autoReplyHtml,
          text: autoReplyText,
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
