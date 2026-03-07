"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { SendIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Spinner } from "@/shared/components/ui/spinner";
import { sendMessage } from "@/data/messages/actions";

export function MessageInput() {
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    const canSend = isPending || !message.trim();

    function handleSendMessage() {
        const value = message.trim();
        if (!value) return;

        startTransition(async () => {
            await sendMessage(value);
            setMessage("");
        });
    }

    return (
        <div className="flex flex-row gap-2 w-full">
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={isPending}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !canSend) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
            />
            <Button type="button" disabled={canSend} onClick={handleSendMessage}>
                {isPending ? <Spinner /> : <SendIcon />}
            </Button>
        </div>
    );
}