export async function sendOTPEmail(to: string, code: string): Promise<void> {
    const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL ?? "http://localhost:3002";

    try {
        const response = await fetch(`${EMAIL_SERVICE_URL}/send-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to, code }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `Failed to send OTP email: ${response.statusText}`);
        }
    } catch (err: any) {
        throw new Error(err.message || "Failed to connect to email service");
    }
}

