import type { Message } from "@/generated/prisma/client";

export interface ClientToServerEvents {
    joinChat: (chatId: number) => void;
    leaveChat: (chatId: number) => void;
    relayMessage: (payload: { chatId: number; message: Message }) => void;
}


export interface ServerToClientEvents {
    message: (payload: { chatId: number; message: Message }) => void;
    userCount: (count: number) => void;
}