import { Button } from "@/shared/components/ui/button";
import { SidebarGroupLabel } from "@/shared/components/ui/sidebar";
import { Plus } from "lucide-react";

export function RecentChats() {
    return (
        <SidebarGroupLabel className="flex items-center justify-between px-4 mb-2 group-data-[collapsible=icon]:hidden">
            <span className="text-[11px] font-bold uppercase tracking-tight text-muted-foreground/60">Recent Chats</span>
            <Button className="flex items-center gap-1" variant="ghost">
                <Plus className="h-3.5 w-3.5 cursor-pointer hover:text-primary transition-colors" />
            </Button>
        </SidebarGroupLabel>
    )
}