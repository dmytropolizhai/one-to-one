import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import { RecentChats } from "./components/recent-chats"
import { getMe } from "@/data/users/actions"
import { MyPublicId } from "./components/my-public-id"
import { SidebarHeaderCustom } from "./components/sidebar-header-custom"
import { SidebarSearch } from "./components/sidebar-search"
import { SidebarUser } from "./components/sidebar-user"

export async function AppSidebar() {
    const me = await getMe();
    if (!me) return null;

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeaderCustom />
            <SidebarContent className="gap-0">
                <div className="mt-4">
                    <SidebarSearch />
                </div>
                <RecentChats />
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border/50 p-3 bg-sidebar-accent/5">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarUser />
                    </SidebarMenuItem>
                    <SidebarMenuItem className="mt-2 h-auto px-2 flex-row rounded-xl transition-all">
                        <MyPublicId />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}