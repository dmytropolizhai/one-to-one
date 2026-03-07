import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemProps } from "@/shared/components/ui/item";
import { Message as MessageType } from "../types";

export type MessageProps = MessageType & ItemProps

/**
 * @param content - The content of the message.
 * @param sender - The sender of the message.
 * @param timestamp - The timestamp of the message.
 * @returns The message component.
 */
export function MessageItem({ id, content, sender, timestamp, ...rest }: MessageProps) {
    const isMe = sender === "me";

    return (
        <Item variant={isMe ? "muted" : "outline"} id={id} {...rest}>
            <ItemContent>
                <ItemTitle>{content}</ItemTitle>
                <ItemDescription>{timestamp.toLocaleTimeString()}</ItemDescription>
            </ItemContent>
        </Item>
    );
}