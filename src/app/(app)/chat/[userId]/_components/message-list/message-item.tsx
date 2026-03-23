"use client"

import { cn } from "@/shared/lib/utils";

export type MessageItemProps = {
    id: string;
    content: string;
    createdAt: Date;
    isMe?: boolean;
}

export function MessageItem({ id, content, createdAt, isMe }: MessageItemProps) {
    return (
        <div
            data-id={id}
            className={cn(
                "flex flex-col gap-1 max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                isMe
                    ? "bg-primary text-primary-foreground self-end rounded-tr-none shadow-sm"
                    : "bg-muted text-foreground self-start rounded-tl-none border border-border"
            )}>
            <div className="wrap-break-word">{content}</div>
            <div className={cn(
                "text-[10px] opacity-70 self-end mt-1",
                isMe ? "text-primary-foreground" : "text-muted-foreground"
            )}>
                {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
}
