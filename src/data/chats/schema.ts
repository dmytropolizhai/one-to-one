import { Chat } from "@/generated/prisma/client";
import { z } from "zod";

export const connectUserSchema = z.object({
    publicId: z.string().uuid({ message: "Invalid Public ID format" }),
});

export type ConnectUserData = z.infer<typeof connectUserSchema>;

export type ClientChat = Chat & {
    name: string;
    lastMessage: string;
    initial: string;
    isSelected?: boolean;
}