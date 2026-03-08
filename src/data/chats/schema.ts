import { z } from "zod";

export const connectUserSchema = z.object({
    publicId: z.string().uuid({ message: "Invalid Public ID format" }),
});

export type ConnectUserData = z.infer<typeof connectUserSchema>;