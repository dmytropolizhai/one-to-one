import crypto from "node:crypto";

/**
 * Generate OTP code
 * @param length Length of OTP code
 * @returns OTP code
 */
export function generateOTP(length: number = 6) {
    return crypto.randomInt(100000, 999999).toString().padStart(length, "0");
}

/**
 * Hash OTP code with email for security
 * @param email User email
 * @param code OTP code
 * @returns Hashed OTP code
 */
export function hashOtp(email: string, code: string) {
    return crypto
        .createHash("sha256")
        .update(`${email}:${code}`)
        .digest("hex");
}

