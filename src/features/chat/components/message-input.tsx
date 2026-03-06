"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { SendIcon } from "lucide-react";
import { useChat } from "../hooks/use-chat";
import { useState } from "react";
import { Spinner } from "@/shared/components/ui/spinner";

export function MessageInput() {
    const [message, setMessage] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);

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
            />
            <Button onClick={handleSendMessage} className="hover:cursor-pointer" disabled={isSending || !message.trim()}>
                {isSending ? <Spinner /> : <SendIcon />}
            </Button>
        </div>
    )
}