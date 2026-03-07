"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { SendIcon } from "lucide-react";
import { useChat } from "../_hooks/use-chat";
import { useState } from "react";
import { Spinner } from "@/shared/components/ui/spinner";

export function MessageInput() {
    const [message, setMessage] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);

    /**
     * Checks if the message can be sent.
     * @returns True if the message can be sent, false otherwise.
     */
    const canSend = (): boolean => isSending || !message.trim();

    const { sendMessage } = useChat();

    function handleSendMessage() {
        setIsSending(true);
        sendMessage(message).then(() => {
            setIsSending(false);
            setMessage("");
        });
    }

    return (
        <div className="flex flex-row gap-2 w-full">
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={isSending}
            />
            <Button onClick={handleSendMessage} className="hover:cursor-pointer" disabled={canSend()}>
                {isSending ? <Spinner /> : <SendIcon />}
            </Button>
        </div>
    )
}