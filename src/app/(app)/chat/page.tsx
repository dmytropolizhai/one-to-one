import { getChats } from "@/data/chats/actions";
import { redirect } from "next/navigation";
import { MessageSquarePlus } from "lucide-react";

export default async function ChatPage() {
  const chats = await getChats();

  if (chats.length > 0) {
    redirect(`/chat/${chats[0].id}`);
  }

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center bg-background p-6">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-6">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageSquarePlus className="size-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">No active chats</h1>
          <p className="text-muted-foreground">
            Select a friend from the sidebar or connect with a new user using their Public ID to start messaging.
          </p>
        </div>
      </div>
    </main>
  );
}