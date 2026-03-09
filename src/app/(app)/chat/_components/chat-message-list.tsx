"use client"

import { Message } from "@/generated/prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessageItem } from "./chat-message-item";
import { useSocket, useSocketEvent } from "@/websocket/hooks/use-socket";

type ChatMessageListProps = {
    messages: Message[];
    meId: string | number;
    chatId: string;
}

export function ChatMessageList({
    messages: initialMessages,
    meId,
    chatId
}: ChatMessageListProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { socket, connected } = useSocket();

    useEffect(() => {
        if (!socket || !chatId || !connected) return;

        socket.emit("joinChat", chatId);

        return () => {
            socket.emit("leaveChat", chatId);
        }
    }, [socket, chatId, connected]);

    const onMessage = useCallback((payload: { chatId: string; message: Message }) => {
        if (payload.chatId === chatId) {
            setMessages((prev) => {
                if (prev.some(m => m.id === payload.message.id)) return prev;
                return [...prev, payload.message];
            });
        }
    }, [chatId]);

    useSocketEvent("message", onMessage);



    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col gap-3 w-full p-4 overflow-y-auto flex-1 scrollbar-hide">
            {messages.map((msg) => {
                const isMe = msg.userId === meId;
                return (
                    <ChatMessageItem
                        key={msg.id}
                        id={msg.id.toString()}
                        content={msg.content}
                        createdAt={msg.createdAt}
                        isMe={isMe}
                    />
                );
            })}
            <div ref={bottomRef} className="h-0" />
        </div>
    )
}
