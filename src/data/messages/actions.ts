"use server";

import "server-only";
import { prisma } from "@/shared/lib/prisma";
import { getMe } from "@/data/users/actions";
import { getCurrentChat } from "../chats/actions";

export async function getMessages() {
    try {
        const user = await getMe();
        if (!user) return [];

        return await prisma.message.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });
    } catch (error) {
        console.error("Failed to get messages:", error);
        return [];
    }
}

export async function sendMessage(content: string) {
    try {
        const user = await getMe();
        const chat = await getCurrentChat();

        if (!user) {
            throw new Error("Unauthorized");
        }

        if (!chat) {
            throw new Error("Chat not found");
        }

        const message = await prisma.message.create({
            data: {
                content,
                userId: user.id,
                chatId: chat.databaseId,
            },
        });

        return { success: true, message };
    } catch (error) {
        console.error("Failed to send message:", error);
        return { success: false, error: "Failed to send message" };
    }
}