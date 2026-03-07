import { z } from "zod";

export const createUserSchema = z.object({
    nickname: z.string().min(3, "Nickname is too short").max(20, "Nickname is too long"),
});

export type CreateUserData = z.infer<typeof createUserSchema>;