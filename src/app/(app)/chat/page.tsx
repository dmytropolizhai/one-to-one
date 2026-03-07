import { MessageInput } from "./_components/message-input";
import { MessageList } from "./components/message-list";

export default function ChatPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-start gap-4 bg-background p-4">
      <h1 className="text-2xl font-bold">Chat</h1>
      <section className="flex flex-col gap-2 w-full h-full justify-between p-4">
        <MessageList />
        <MessageInput />
      </section>
    </main>
  );
} 