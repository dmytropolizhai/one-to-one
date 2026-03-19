import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM ?? "support@one-to-one.polizhai.site";

export async function sendOtpEmail(to: string, code: string): Promise<void> {
    const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to,
        subject: "Your login code",
        html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
                <h2 style="font-size:24px;margin-bottom:8px">Your login code</h2>
                <p style="color:#6b7280;margin-bottom:24px">
                    Use the code below to sign in. It expires in <strong>10 minutes</strong>.
                </p>
                <div style="background:#f3f4f6;border-radius:8px;padding:24px;text-align:center">
                    <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#111827">
                        ${code}
                    </span>
                </div>
                <p style="color:#9ca3af;font-size:13px;margin-top:24px">
                    If you did not request this code, you can safely ignore this email.
                </p>
            </div>
        `,
    });

    if (error) {
        throw new Error(`Failed to send OTP email: ${error.message}`);
    }
}
