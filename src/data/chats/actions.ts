"use server"

import { prisma } from "@/shared/lib/prisma";
import { getMe } from "../users/actions";
import { connectUserSchema, ConnectUserData } from "./schema";
import { ActionState } from "@/data/types";

export type ConnectUserState = ActionState<ConnectUserData>;

export async function getChats() {
    const me = await getMe();
    if (!me) return [];

    const chats = await prisma.chat.findMany({
        where: {
            participants: {
                some: {
                    userId: me.id
                }
            }
        },
        include: {
            participants: {
                include: {
                    user: true
                }
            },
            messages: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        }
    });

    return chats.map(chat => {
        const otherParticipant = chat.participants.find(p => p.userId !== me.id)?.user;
        const lastMessage = chat.messages[0];

        return {
            id: chat.publicId,
            databaseId: chat.id,
            name: otherParticipant?.name || "Unknown User",
            lastMessage: lastMessage?.content || "No messages yet",
            initial: otherParticipant?.name?.charAt(0).toUpperCase() || "?"
        };
    });
}

export async function getCurrentChat() {
    const me = await getMe();
    if (!me) return null;

    const chat = await prisma.chat.findFirst({
        where: {
            participants: {
                some: {
                    userId: me.id
                }
            }
        },
        include: {
            participants: {
                include: {
                    user: true
                }
            },
            messages: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        }
    });

    if (!chat) return null;

    const otherParticipant = chat.participants.find(p => p.userId !== me.id)?.user;
    const lastMessage = chat.messages[0];

    return {
        id: chat.publicId,
        databaseId: chat.id,
        name: otherParticipant?.name || "Unknown User",
        lastMessage: lastMessage?.content || "No messages yet",
        initial: otherParticipant?.name?.charAt(0).toUpperCase() || "?",

        getMessages: async () => {
            return await prisma.message.findMany({
                where: {
                    chatId: chat.id
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });
        }
    }
}

async function connectWithUser(publicId: string) {
    const me = await getMe();
    if (!me) throw new Error("Unauthorized");

    if (me.publicId === publicId) {
        throw new Error("You cannot connect with yourself");
    }

    const targetUser = await prisma.user.findUnique({
        where: { publicId }
    });

    if (!targetUser) {
        throw new Error("User with this ID does not exist");
    }

    // Check if chat already exists
    const existingChat = await prisma.chat.findFirst({
        where: {
            AND: [
                { participants: { some: { userId: me.id } } },
                { participants: { some: { userId: targetUser.id } } }
            ]
        }
    });

    if (existingChat) {
        throw new Error("Chat already exist")
    }

    // Create new chat
    const newChat = await prisma.chat.create({
        data: {
            participants: {
                create: [
                    { userId: me.id },
                    { userId: targetUser.id }
                ]
            }
        }
    });

    return newChat.publicId;
}

export async function connectWithUserAction(
    _prev: ConnectUserState,
    formData: FormData
): Promise<ConnectUserState> {
    const raw = Object.fromEntries(formData.entries());
    const parsed = connectUserSchema.safeParse(raw);

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    try {
        await connectWithUser(parsed.data.publicId);
        return { success: true, message: "Connected successfully." };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to connect." };
    }
}

export async function getChat(chatId: string) {
    const me = await getMe();
    if (!me) return null;

    const chat = await prisma.chat.findUnique({
        where: {
            publicId: chatId
        },
        include: {
            participants: {
                include: {
                    user: true
                }
            }
        }
    });

    if (!chat) return null;

    const isParticipant = chat.participants.some(p => p.userId === me.id);
    const otherParticipant = chat.participants.find(p => p.userId !== me.id)?.user;

    return {
        ...chat,
        isParticipant,
        otherUser: otherParticipant,
        getMessages: async () => {
            if (!isParticipant) return [];
            return await prisma.message.findMany({
                where: {
                    chatId: chat.id
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });
        }
    }
}