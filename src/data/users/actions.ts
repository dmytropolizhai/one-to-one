"use server"

import { createUserSchema, CreateUserData } from "@/data/users/schema";
import { prisma } from "@/shared/lib/prisma";
import { cookies } from "next/headers";
import { ActionState } from "@/data/types";
import { generateOTP, hashOtp } from "@/shared/lib/otp";
import { sendOtpEmail } from "@/shared/lib/email";

export type CreateUserState = ActionState<CreateUserData>;

export async function createUserAction(
    _prev: CreateUserState,
    formData: FormData
): Promise<CreateUserState> {
    const raw = Object.fromEntries(formData.entries());
    const parsed = createUserSchema.safeParse(raw);

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    // Validate if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            "email": parsed.data.email,
        }
    });
    if (existingUser) {
        return { success: false, message: "User already exists." };
    }

    // Create user
    const user = await prisma.user.create({
        data: {
            name: parsed.data.name,
            email: parsed.data.email,
        }
    });

    if (user) {
        const cookieStore = await cookies();
        cookieStore.set("user_id", user.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
        return { success: true, message: "User created successfully." };
    }

    return { success: false, message: "Failed to create user." };
}

export async function getMe() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    if (!userId) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });
        return user;
    } catch (error) {
        return null;
    }
}

export async function requestOtpAction(
    _prev: ActionState<{ email: string }>,
    formData: FormData
): Promise<ActionState<{ email: string }>> {
    const email = formData.get("email") as string;

    if (!email) {
        return { success: false, message: "Email is required." };
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return { success: false, message: "User not found." };
    }

    const code = generateOTP();
    const codeHash = hashOtp(email, code);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.otpToken.upsert({
        where: { email },
        update: { codeHash, expiresAt },
        create: { email, codeHash, expiresAt },
    });

    try {
        await sendOtpEmail(email, code);
    } catch {
        return { success: false, message: "Failed to send OTP. Please try again." };
    }

    return { success: true, message: "OTP sent to your email." };
}

export async function verifyOtpAction(
    _prev: ActionState<{ email: string; otp: string }>,
    formData: FormData
): Promise<ActionState<{ email: string; otp: string }>> {
    const email = formData.get("email") as string;
    const otp = formData.get("otp") as string;

    if (!email || !otp) {
        return { success: false, message: "Email and OTP are required." };
    }

    const token = await prisma.otpToken.findUnique({ where: { email } });

    if (!token) {
        return { success: false, message: "No OTP was requested for this email." };
    }

    if (token.expiresAt < new Date()) {
        await prisma.otpToken.delete({ where: { email } });
        return { success: false, message: "OTP has expired. Please request a new one." };
    }

    const submittedHash = hashOtp(email, otp);
    if (submittedHash !== token.codeHash) {
        return { success: false, message: "Invalid OTP. Please try again." };
    }

    // OTP is valid — consume it and create the session
    await prisma.otpToken.delete({ where: { email } });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return { success: false, message: "User not found." };
    }

    const cookieStore = await cookies();
    cookieStore.set("user_id", user.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return { success: true, message: "Logged in successfully." };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("user_id");
}
