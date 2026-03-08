import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuAction, SidebarMenuBadge } from "@/shared/components/ui/sidebar"
import { MoreHorizontal } from "lucide-react"

type Chat = {
    id: string,
    name: string,
    lastMessage: string,
    initial: string,
}

export function ChatList({ chats }: { chats: Chat[] }) {
    return (
        <SidebarMenu className="gap-1">
            {chats.map(chat => (
                <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton
                        tooltip={chat.name}
                        className="h-[68px] px-4 hover:bg-sidebar-accent/50 transition-all duration-200 group relative"
                    >
                        <div className="relative shrink-0">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/30 text-primary border border-primary/20 font-bold text-base shadow-xs">
                                {chat.initial}
                            </div>
                            {/* TODO: Make online status */}
                        </div>
                        <div className="flex flex-1 flex-col overflow-hidden text-left ml-3">
                            <div className="flex items-center justify-between">
                                <span className="truncate font-bold text-[14px] text-foreground/90 leading-tight">{chat.name}</span>
                                <span className="text-[10px] text-muted-foreground/50 font-medium shrink-0 ml-2">
                                    {/* TODO: Last message date/time */}
                                </span>
                            </div>
                            <span className="truncate text-[13px] text-muted-foreground/70 mt-1 leading-snug">
                                {chat.lastMessage}
                            </span>
                        </div>
                    </SidebarMenuButton>
                    <SidebarMenuAction className="right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </SidebarMenuAction>
                    {/* TODO: Unseen message count */}
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}