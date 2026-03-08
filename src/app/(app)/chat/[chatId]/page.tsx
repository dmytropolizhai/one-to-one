import { connectWithUserAction, getChat } from "@/data/chats/actions";
import { ChatInput } from "../_components/chat-input";
import { ChatMessagesView } from "../_components/chat-messages-view";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { UserPlus } from "lucide-react";
import { Spinner } from "@/shared/components/ui/spinner";

import Form from "next/form";

export default async function DynamicChatPage({
    params,
}: {
    params: Promise<{ chatId: string }>;
}) {
    const { chatId } = await params;
    const chat = await getChat(chatId);

    if (!chat) {
        notFound();
    }

    if (!chat.isParticipant) {
        return (
            <main className="flex flex-col h-screen w-full items-center justify-center bg-background p-6">
                <div className="max-w-md w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl p-8 flex flex-col items-center text-center space-y-6">
                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserPlus className="size-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">Private Conversation</h1>
                        <p className="text-muted-foreground">
                            You are not a member of this chat. Would you like to request access or connect with <span className="text-foreground font-semibold">{chat.otherUser?.name || "this user"}</span>?
                        </p>
                    </div>
                    <Form action={connectWithUserAction.bind(null, { success: false }) as any}>
                        <input type="hidden" name="publicId" value={chat.otherUser?.publicId || ""} />
                        <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl">
                            Send Connection Request
                        </Button>
                    </Form>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col h-screen w-full overflow-hidden bg-background">
            <div className="flex-1 overflow-hidden relative flex flex-col">
                <Suspense fallback={
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <Spinner />
                        <p className="text-sm text-muted-foreground animate-pulse">Loading secure messages...</p>
                    </div>
                }>
                    <ChatMessagesView chatId={chatId} />
                </Suspense>
                <ChatInput />
            </div>
        </main>
    );
}
