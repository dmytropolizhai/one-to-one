"use server"

import { prisma } from "@/shared/lib/prisma";
import { getMe } from "../users/actions";
import { connectUserSchema, ConnectUserData, ClientChat } from "./schema";
import { ActionState } from "@/data/types";

export type ConnectUserState = ActionState<ConnectUserData>;

export async function getClientChats(): Promise<ClientChat[]> {
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
            id: chat.id,
            userPublicId: otherParticipant?.publicId || "",
            name: otherParticipant?.name || "Unknown User",
            lastMessage: lastMessage?.content || "No messages yet",
            initial: otherParticipant?.name?.charAt(0).toUpperCase() || "?",
        };
    });
}

async function connectWithUser(publicId: string): Promise<string> {
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

    return targetUser.publicId;
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

export async function getChat(otherUserPublicId: string) {
    const me = await getMe();
    if (!me) return null;

    const otherUser = await prisma.user.findUnique({
        where: { publicId: otherUserPublicId }
    });

    if (!otherUser) return null;

    if (me.id === otherUser.id) {
        return null;
    }

    const chat = await prisma.chat.findFirst({
        where: {
            AND: [
                { participants: { some: { userId: me.id } } },
                { participants: { some: { userId: otherUser.id } } }
            ]
        },
        include: {
            participants: {
                include: {
                    user: true
                }
            }
        }
    });

    return {
        ...chat,
        isParticipant: !!chat,
        otherUser
    };
}