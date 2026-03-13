"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuAction, SidebarMenuBadge } from "@/shared/components/ui/sidebar"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { ClientChat } from "@/data/chats/schema";

export function ChatList({ chats }: { chats: ClientChat[] }) {
    const pathname = usePathname();

    return (
        <SidebarMenu className="gap-1">
            {chats.map((chat, index) => {
                const href = `/chat/${chat.id}`
                const isActive = pathname === href;

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
                            <Link href={href} onClick={e => {
                                if (isActive) {
                                    e.preventDefault();
                                }
                            }}>
                                <div className="relative shrink-0">
                                    <div className={cn(
                                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-bold text-base shadow-xs transition-colors",
                                        isActive ? "bg-primary text-primary-foreground" : "bg-linear-to-br from-primary/10 to-primary/30 text-primary border border-primary/20"
                                    )}>
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
                                    <span className={cn(
                                        "truncate text-[13px] mt-1 leading-snug",
                                        isActive ? "text-muted-foreground" : "text-muted-foreground/70"
                                    )}>
                                        {chat.lastMessage}
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                        {/* TODO: Make horizontal button to delete chat and implement swipe to do (in this case: delete) */}
                        {/* TODO: Unseen message count */}
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    )
}