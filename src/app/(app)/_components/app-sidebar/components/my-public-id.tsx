import { getMe } from "@/data/users/actions";
import { CopyButton } from "@/shared/components/buttons/copy-button";

export async function MyPublicId() {
    const me = await getMe();

    if (!me) {
        return null;
    }

    return (
        <div className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl bg-sidebar-accent/10 border border-sidebar-border/30 shadow-xs group-data-[collapsible=icon]:px-2 overflow-hidden">
            <div className="flex flex-col flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 leading-none mb-1">My Public ID</span>
                <span className="text-[11px] font-mono font-medium text-foreground/70 truncate">
                    {me.publicId}
                </span>
            </div>
            <div className="shrink-0 group-data-[collapsible=icon]:hidden">
                <CopyButton text={me.publicId.toString()} />
            </div>
        </div>
    )
}