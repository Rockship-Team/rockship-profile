import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with the provided API Key
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
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
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f5; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #0f172a; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Rockship AI</h1>
              <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">New Pilot Inquiry</p>
            </div>
            
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <h2 style="font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Contact Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; width: 100px;">Name</td>
                    <td style="padding: 8px 0; font-weight: 500; color: #334155;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Email</td>
                    <td style="padding: 8px 0; font-weight: 500; color: #334155;">
                      <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                </table>
              </div>

              <div>
                <h2 style="font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Project Details</h2>
                <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0; color: #334155; white-space: pre-wrap;">${message}</div>
              </div>
            
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">Reply to Inquiry</a>
              </div>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
              <p style="margin: 0;">This email was sent from the contact form on Rockship AI Showcase.</p>
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
