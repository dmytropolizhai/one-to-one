import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import { RecentChats } from "./recent-chats"
import { getChats } from "@/data/chats/actions"
import { getMe } from "@/data/users/actions"
import { ChatList } from "./chat-list"

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
                    <RecentChats />

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <ChatList chats={chats} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* <SidebarFooter className="border-t border-sidebar-border/50 p-3 bg-sidebar-accent/5">
                <SidebarMenu>
                    <SidebarMenuItem className="h-14 px-2 flex-row  rounded-xl transition-all">
                        <User />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter> */}
        </Sidebar>
    )
}