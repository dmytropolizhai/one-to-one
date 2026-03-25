import express, { Request, Response } from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.EMAIL_FROM ?? "support@one-to-one.polizhai.site";

app.post("/send-otp", async (req: Request, res: Response): Promise<void> => {
    const { to, code } = req.body;

    if (!to || !code) {
        res.status(400).json({ error: "Missing 'to' or 'code'" });
        return;
    }

    try {
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
            console.error("Resend error:", error);
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Internal Server Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "healthy" });
});

const PORT = Number(process.env.PORT ?? 3002);
app.listen(PORT, () => {
    console.log(`Email service running on http://localhost:${PORT}`);
});
