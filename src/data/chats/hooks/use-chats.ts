import { useEffect } from "react";
import { create } from "zustand";

import { getClientChats } from "../actions";
import { ClientChat } from "../schema";

interface ChatState {
    chats: ClientChat[];
    addChat: (chat: ClientChat) => void;
    removeChat: (chatId: number) => void;
    updateChat: (chatId: number, chat: ClientChat) => void;
    init: () => Promise<ClientChat[]>;
}

const useChatStore = create<ChatState>((set) => ({
    chats: [],
    addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
    removeChat: (chatId) => set((state) => ({ chats: state.chats.filter((chat) => chat.id !== chatId) })),
    updateChat: (chatId, chat) => set((state) => ({ chats: state.chats.map((chat) => chat.id === chatId ? chat : chat) })),
    init: async () => {
        const chats = await getClientChats();
        set({ chats });
        return chats;
    }
}));

export function useChats() {
    const chatStore = useChatStore();

    useEffect(() => {
        chatStore.init();
    }, [])

    return chatStore.chats;
}

export function useCurrentChat() {
    const chatStore = useChatStore();
    const currentChat = chatStore.chats.find((chat) => chat.isSelected);

    return currentChat;
}