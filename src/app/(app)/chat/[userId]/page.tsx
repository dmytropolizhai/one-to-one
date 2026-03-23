import { connectWithUserAction, getChat } from "@/data/chats/actions";
import { ChatInput } from "../_components/chat-input";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { UserPlus } from "lucide-react";
import { Spinner } from "@/shared/components/ui/spinner";

import Form from "next/form";
import { CentralMessage } from "@/shared/components/central-message";
import { prisma } from "@/shared/lib/prisma";
import { MessageList } from "./_components/message-list";
import { auth } from "@/shared/lib/auth";

interface ChatParams {
    userId: string;
}

type ChatPageProps = {
    params: Promise<ChatParams>;
}

export default async function DynamicChatPage({ params }: ChatPageProps) {
    const { userId } = await params;

    const me = await auth();
    const chatPageData = await getChat(userId);
    if (!chatPageData) {
        notFound();
    }

    const { isParticipant, otherUser, id: databaseChatId } = chatPageData;

    const messages = databaseChatId ? await prisma.message.findMany({
        where: {
            chatId: databaseChatId
        },
        orderBy: {
            createdAt: "asc"
        }
    }) : [];


    if (!isParticipant) {
        return (
            <main className="flex flex-col h-screen w-full items-center justify-center bg-background p-6">
                <div className="max-w-md w-full bg-sidebar-accent/50 border border-sidebar-border rounded-2xl p-8 flex flex-col items-center text-center space-y-6">
                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserPlus className="size-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">Private Conversation</h1>
                        <p className="text-muted-foreground">
                            You are not a member of this chat. Would you like to request access or connect with <span className="text-foreground font-semibold">{otherUser?.name || "this user"}</span>?
                        </p>
                    </div>
                    <Form action={connectWithUserAction.bind(null, { success: false }) as any}>
                        <input type="hidden" name="publicId" value={otherUser?.publicId || ""} />
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
                    {isParticipant && databaseChatId ? (
                        <MessageList
                            messages={messages}
                            meId={me.id}
                            chatId={databaseChatId}
                        />
                    ) : (
                        <CentralMessage message="No active chat found." />
                    )}
                </Suspense>
                {isParticipant && databaseChatId && <ChatInput chatId={databaseChatId} />}
            </div>
        </main>
    );
}
