"use server";

import { prisma } from "@/shared/lib/prisma";
import { getMe } from "@/data/users/actions";

export async function getMessages(chatId: number) {
    try {
        const user = await getMe();
        if (!user) return [];

        return await prisma.message.findMany({
            where: {
                chatId: chatId,
            }, orderBy: {
                createdAt: "asc",
            },
        });
    } catch (error) {
        console.error("Failed to get messages:", error);
        return [];
    }
}

export async function sendMessage(content: string, chatId: number) {
    try {
        const user = await getMe();
        if (!user) {
            throw new Error("Unauthorized");
        }

        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: { participants: true }
        });

        if (!chat || !chat.participants.some(p => p.userId === user.id)) {
            throw new Error("Chat not found or access denied");
        }

        const message = await prisma.message.create({
            data: {
                content,
                userId: user.id,
                chatId: chat.id,
            },
        });

        return { success: true, message };
    } catch (error) {
        console.error("Failed to send message:", error);
        return { success: false, error: "Failed to send message" };
    }
}