"use server"

import { createUserSchema, CreateUserData } from "@/data/users/schema";
import { prisma } from "@/shared/lib/prisma";

export type CreateUserState = {
    success: boolean;
    errors?: Partial<Record<keyof CreateUserData, string[]>>;
    message?: string;
};

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
        return { success: true, message: "User created successfully." };
    }

    return { success: false, message: "Failed to create user." };
}
