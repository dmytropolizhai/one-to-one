import { useCallback, useEffect } from "react";
import { create } from "zustand";

import { getMessages } from "./actions";
import { useSocket, useSocketEvent } from "@/websocket/hooks/use-socket";
import { Message } from "@/generated/prisma/client";
import { useCurrentChat } from "@/data/chats/hooks";

interface MessageState {
    messagesByChat: Record<string, Message[]>;
    setMessages: (chatId: number, messages: Message[]) => void;
    addMessage: (chatId: number, message: Message) => void;
    clearMessages: (chatId: number) => void;
}

interface MessagePayload {
    chatId: number;
    message: Message;
}

const useMessageStore = create<MessageState>((set) => ({
    messagesByChat: {},

    setMessages: (chatId, messages) =>
        set((state) => ({
            messagesByChat: {
                ...state.messagesByChat,
                [chatId]: messages,
            },
        })),

    addMessage: (chatId, message) =>
        set((state) => {
            const existingMessages = state.messagesByChat[chatId] ?? [];

            const alreadyExists = existingMessages.some((m) => m.id === message.id);
            if (alreadyExists) return state;

            return {
                messagesByChat: {
                    ...state.messagesByChat,
                    [chatId]: [...existingMessages, message],
                },
            };
        }),

    clearMessages: (chatId) =>
        set((state) => ({
            messagesByChat: {
                ...state.messagesByChat,
                [chatId]: [],
            },
        })),
}));

/**
 * Hook for getting messages for the current chat.
 * Handles:
 * - loading messages when chat changes
 * - joining/leaving socket rooms
 * - appending new socket messages
 * - deduplicating by message id
 */
export function useMessages() {
    const currentChat = useCurrentChat();
    const chatId = currentChat?.id;

    const { socket, connected } = useSocket();

    const messages = useMessageStore(
        useCallback(
            (state) => (chatId ? state.messagesByChat[chatId] ?? [] : []),
            [chatId]
        )
    );

    const setMessages = useMessageStore((state) => state.setMessages);
    const addMessage = useMessageStore((state) => state.addMessage);
    const clearMessages = useMessageStore((state) => state.clearMessages);

    // Load messages whenever the current chat changes.
    useEffect(() => {
        if (!chatId) return;

        let cancelled = false;

        const loadMessages = async () => {
            try {
                // Optional: clear immediately so previous chat's messages don't flash.
                clearMessages(chatId);

                const fetchedMessages = await getMessages(chatId);

                if (cancelled) return;
                setMessages(chatId, fetchedMessages);
            } catch (error) {
                console.error("Failed to load messages:", error);
                if (!cancelled) {
                    setMessages(chatId, []);
                }
            }
        };

        loadMessages();

        return () => {
            cancelled = true;
        };
    }, [chatId, clearMessages, setMessages]);

    // Join the active chat room.
    useEffect(() => {
        if (!socket || !connected || !chatId) return;

        socket.emit("joinChat", chatId);

        return () => {
            socket.emit("leaveChat", chatId);
        };
    }, [socket, connected, chatId]);

    const onMessage = useCallback(
        (payload: MessagePayload) => {
            if (!chatId) return;
            if (payload.chatId !== chatId) return;

            addMessage(payload.chatId, payload.message);
        },
        [chatId, addMessage]
    );

    // Subscribe to incoming messages.
    useSocketEvent("message", onMessage);

    return messages;
}