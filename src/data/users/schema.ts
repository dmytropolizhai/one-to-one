"use server"

import { createUserSchema, CreateUserData } from "@/data/users/actions";

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

    // TODO: persist user
    await new Promise((res) => setTimeout(res, 1000));

    return { success: true, message: "User created successfully." };
}
