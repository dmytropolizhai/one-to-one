import {
    MoreHorizontal,
    Settings,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuAction,
} from "@/shared/components/ui/sidebar"
import { RecentChannels } from "./recent-channels"
import { getChats } from "@/data/chats/actions"
import { getMe } from "@/data/users/actions"
import { User } from "./user"
import { LogoutButton } from "../logout-button"

export async function AppSidebar() {
    const [me, chats] = await Promise.all([getMe(), getChats()])

    if (!me) return null;

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            {/* TODO: Connection status */}
            {/* <SidebarHeader className="border-b border-sidebar-border/50 pb-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="hover:bg-transparent">
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader> */}
            <SidebarContent>
                <SidebarGroup>
                    {/* TODO: Create search */}
                    {/* <div className="relative mb-6 mt-2 px-2 group-data-[collapsible=icon]:hidden">
                        <Search className="absolute left-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/70" />
                        <input
                            placeholder="Find a conversation..."
                            className="w-full bg-sidebar-accent/30 border border-sidebar-border/50 rounded-full py-2 pl-9 pr-3 text-[13px] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        />
                    </div> */}
                    <RecentChannels />

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {chats.map((chat) => (
                                <SidebarMenuItem key={chat.id}>
                                    <SidebarMenuButton
                                        tooltip={chat.name}
                                        className="h-14 px-4 hover:bg-sidebar-accent/50 transition-all duration-200"
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary/10 to-primary/30 text-primary border border-primary/20 font-semibold text-sm">
                                            {chat.initial}
                                        </div>
                                        <div className="flex flex-1 flex-col overflow-hidden text-left ml-2">
                                            <span className="truncate font-semibold text-sm text-foreground/90">{chat.name}</span>
                                            <span className="truncate text-xs text-muted-foreground mt-0.5">{chat.lastMessage}</span>
                                        </div>
                                    </SidebarMenuButton>
                                    <SidebarMenuAction className="right-2 group-hover:opacity-100">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </SidebarMenuAction>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border/50 p-3 bg-sidebar-accent/5">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="h-14 px-2 hover:bg-sidebar-accent/50 rounded-xl transition-all"
                            size="lg"
                        >
                            <User />
                            <LogoutButton />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}