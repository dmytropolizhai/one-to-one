"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuAction, SidebarMenuBadge } from "@/shared/components/ui/sidebar"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

type Chat = {
    id: string,
    name: string,
    lastMessage: string,
    initial: string,
}

export function ChatList({ chats }: { chats: Chat[] }) {
    const pathname = usePathname();

    return (
        <SidebarMenu className="gap-1">
            {chats.map((chat, index) => {
                const isActive = pathname === `/chat/${chat.id}`;
                return (
                    <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton
                            asChild
                            tooltip={chat.name}
                            className={cn(
                                "h-[68px] px-4 transition-all duration-200 group relative",
                                isActive ? "bg-sidebar-accent shadow-sm ring-1 ring-sidebar-border" : "hover:bg-sidebar-accent/50"
                            )}
                        >
                            <Link href={`/chat/${chat.id}`}>
                                <div className="relative shrink-0">
                                    <div className={cn(
                                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-bold text-base shadow-xs transition-colors",
                                        isActive ? "bg-primary text-primary-foreground" : "bg-linear-to-br from-primary/10 to-primary/30 text-primary border border-primary/20"
                                    )}>
                                        {chat.initial}
                                    </div>
                                    {index % 3 === 0 && (
                                        <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-sidebar bg-green-500 shadow-sm" />
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col overflow-hidden text-left ml-3">
                                    <div className="flex items-center justify-between">
                                <span className="truncate font-bold text-[14px] text-foreground/90 leading-tight">{chat.name}</span>
                                        <span className="text-[10px] text-muted-foreground/50 font-medium shrink-0 ml-2">
                                            {index === 0 ? "12:45" : index === 1 ? "Yesterday" : "2 days"}
                                        </span>
                                    </div>
                                    <span className={cn(
                                        "truncate text-[13px] mt-1 leading-snug",
                                        isActive ? "text-muted-foreground" : "text-muted-foreground/70"
                                    )}>
                                        {chat.lastMessage}
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                        <SidebarMenuAction className="right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </SidebarMenuAction>
                        {index === 0 && (
                            <SidebarMenuBadge className="right-10 top-[22px] bg-primary text-primary-foreground size-5 rounded-full border-2 border-sidebar flex items-center justify-center text-[10px] font-bold shadow-sm">
                                2
                            </SidebarMenuBadge>
                        )}
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    )
}