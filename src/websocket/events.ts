export interface ClientToServerEvents {
    joinChat: (chatId: string) => void;
    leaveChat: (chatId: string) => void;
    sendMessage: (message: string) => void;
}

export interface ServerToClientEvents {
    message: (message: string) => void;
    userCount: (count: number) => void;
}