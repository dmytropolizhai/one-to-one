import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(3, "Name is too short").max(20, "Name is too long"),
    email: z.string().email("Invalid email"),
});

export type CreateUserData = z.infer<typeof createUserSchema>;