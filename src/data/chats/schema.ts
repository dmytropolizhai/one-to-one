import { z } from "zod";

export const connectUserSchema = z.object({
    publicId: z.string().uuid({ message: "Invalid Public ID format" }),
});

export type ConnectUserData = z.infer<typeof connectUserSchema>;

export interface ClientChat {
    id: number;        // database primary key — used for everything
    publicId: string;  // UUID for human-readable URLs
    name: string;
    lastMessage: string;
    initial: string;
    isSelected?: boolean;
}