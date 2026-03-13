import { z } from "zod";

export const messageSchema = z.object({
    id: z.number(),
    content: z.string(),
    createdAt: z.date(),
    userId: z.number(),
    chatId: z.number()
});

export type ClientMessage = z.infer<typeof messageSchema>;
