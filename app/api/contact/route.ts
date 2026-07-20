import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Read the key at request time, not module load. Constructing Resend at module
 * scope threw "Missing API key" during `next build`, breaking the build on any
 * machine without the secret — including CI.
 *
 * NEXT_PUBLIC_RESEND_API_KEY is read only as a fallback so existing deploys
 * keep working. That prefix ships the secret into the browser bundle: rename
 * the variable to RESEND_API_KEY, rotate the key, then drop the fallback.
 */
function getResendClient() {
  const apiKey =
    process.env.RESEND_API_KEY ?? process.env.NEXT_PUBLIC_RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const resend = getResendClient();
    if (!resend) {
      console.error("Contact form: RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email is not configured on this environment" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // Validate input
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Rockship AI Contact <onboarding@resend.dev>",
      to: ["rockship.ops@gmail.com"],
      subject: `New Contact from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; margin: 0; padding: 0;">
          <div style="max-width: 640px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025); border: 1px solid #f1f5f9;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 0; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Rockship AI</h1>
              <p style="color: #94a3b8; margin: 8px 0 0; font-size: 15px; font-weight: 500;">New Pilot Inquiry</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              
              <!-- Intro -->
              <p style="margin-top: 0; margin-bottom: 24px; font-size: 16px; color: #475569;">
                You have received a new inquiry from the contact form. Here are the details:
              </p>

              <!-- Contact Info Card -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin: 0 0 16px 0;">Contact Information</h2>
                
                <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-size: 14px; width: 120px; vertical-align: top;">Full Name</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 600; font-size: 15px;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-size: 14px; vertical-align: top;">Email Address</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 600; font-size: 15px;">
                      <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              <div>
                 <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin: 0 0 16px 0;">Project Details</h2>
                 <div style="font-size: 16px; color: #334155; white-space: pre-wrap; line-height: 1.7; background-color: #ffffff; padding: 0;">${message}</div>
              </div>

              <!-- CTA -->
              <div style="margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 32px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);">Reply to Inquiry</a>
                <p style="margin-top: 16px; font-size: 13px; color: #94a3b8;">
                   Direct reply to <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                </p>
              </div>

            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center;">
               <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                 Sent via Rockship AI Contact Form
               </p>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Message sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
