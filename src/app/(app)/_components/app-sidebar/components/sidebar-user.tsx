import { SidebarMenuButton } from "@/shared/components/ui/sidebar"
import { getMe } from "@/data/users/actions"
import { User2 } from "lucide-react"
import { SettingsPanel } from "@/shared/components/panels/settings"

export async function SidebarUser() {
    const me = await getMe()

    if (!me) return null

    return (
        <SidebarMenuButton
            size="lg"
            className="w-full justify-start gap-2 px-2 hover:bg-sidebar-accent/50 transition-all rounded-xl border border-transparent hover:border-sidebar-border/50"
        >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary/20 to-primary/10 text-primary border border-primary/20">
                <User2 className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                <span className="truncate font-bold text-foreground/90">{me.name}</span>
                <span className="truncate text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider">{me.email}</span>
            </div>
            <SettingsPanel />
        </SidebarMenuButton>
    )
}