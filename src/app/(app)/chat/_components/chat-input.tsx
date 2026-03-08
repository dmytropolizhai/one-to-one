"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { SendIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Spinner } from "@/shared/components/ui/spinner";
import { sendMessage } from "@/data/messages/actions";
import { cn } from "@/shared/lib/utils";

import { useParams } from "next/navigation";

export function ChatInput() {
    const { chatId } = useParams() as { chatId: string };
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    const isSubmitDisabled = isPending || !message.trim();

    function handleSendMessage() {
        const value = message.trim();
        if (!value || !chatId) return;

        startTransition(async () => {
            await sendMessage(value, chatId);
            setMessage("");
        });
    }

    return (
        <div className="w-full p-4 border-t bg-background/80 backdrop-blur-sm">
            <div className="flex flex-row items-center gap-2 max-w-4xl mx-auto">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isPending}
                    className="flex-1 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-11"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !isSubmitDisabled) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <Button
                    type="button"
                    disabled={isSubmitDisabled}
                    onClick={handleSendMessage}
                    size="icon"
                    className={cn(
                        "size-11 rounded-full shrink-0 transition-all",
                        message.trim() ? "scale-100" : "scale-90"
                    )}
                >
                    {isPending ? <Spinner className="size-4" /> : <SendIcon className="size-4" />}
                </Button>
            </div>
        </div>
    );
}
