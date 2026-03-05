"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { SendIcon } from "lucide-react";
import { useChat } from "../hooks/use-chat";
import { useState } from "react";

export function MessageInput() {
    const [value, setValue] = useState<string>("");
    const { sendMessage } = useChat();

    function handleSendMessage() {
        sendMessage(value);
        setValue("");
    }

    return (
        <div className="flex flex-row gap-2 w-full">
            <Input placeholder="Type a message..." value={value} onChange={(e) => setValue(e.target.value)} />
            <Button onClick={handleSendMessage}>
                <SendIcon />
            </Button>
        </div>
    )
}