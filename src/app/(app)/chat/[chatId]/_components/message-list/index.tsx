"use client"

import { Message } from "@/generated/prisma/client";
import { useEffect, useRef } from "react";
import { MessageItem } from "./message-item";
import { useMessages } from "@/data/messages/hooks";

type ChatMessageListProps = {
    messages: Message[];
    meId: string | number;
    chatId: string;
}

export function MessageList({
    messages: initialMessages,
    meId,
    chatId
}: ChatMessageListProps) {
    const messages = useMessages();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col gap-3 w-full p-4 overflow-y-auto flex-1 scrollbar-hide">
            {messages.map((msg) => {
                const isMe = msg.userId === meId;
                return (
                    <MessageItem
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
