import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/shared/components/ui/sidebar";
import { ConnectWithUserDialog } from "./connect-with-user-dialog";
import { ChatList } from "./chat-list";
import { getClientChats } from "@/data/chats/actions";

export async function RecentChats() {
    const chats = await getClientChats();

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between px-4 mt-6 mb-2 group-data-[collapsible=icon]:hidden">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 leading-none">Recent Conversations</span>
                <ConnectWithUserDialog />
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <ChatList chats={chats} />
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}