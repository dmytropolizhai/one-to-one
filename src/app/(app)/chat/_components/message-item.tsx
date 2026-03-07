import { Item, ItemContent, ItemDescription, ItemTitle, ItemProps } from "@/shared/components/ui/item";

export type MessageProps = ItemProps & {
    id: string | number;
    content: string;
    createdAt: Date;
    isMe?: boolean;
}

export function MessageItem({ id, content, createdAt, isMe, ...rest }: MessageProps) {
    return (
        <Item variant={isMe ? "muted" : "outline"} id={id.toString()} {...rest}>
            <ItemContent>
                <ItemTitle>{content}</ItemTitle>
                <ItemDescription>{new Date(createdAt).toLocaleTimeString()}</ItemDescription>
            </ItemContent>
        </Item>
    );
}