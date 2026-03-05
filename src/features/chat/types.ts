export type Message = {
    id: string;
    content: string;
    sender: "me" | "other";
    timestamp: Date;
}