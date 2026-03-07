"use server"

import { createUserSchema, CreateUserData } from "@/data/users/schema";
import { prisma } from "@/shared/lib/prisma";
import { cookies } from "next/headers";
import { ActionState } from "@/data/types";

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

export async function loginAction(
    _prev: ActionState<{ email: string }>,
    formData: FormData
): Promise<ActionState<{ email: string }>> {
    const email = formData.get("email") as string;

    if (!email) {
        return { success: false, message: "Email is required." };
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

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
