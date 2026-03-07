import { getMe } from "@/data/users/actions";
import { User2 } from "lucide-react";

export async function User() {
    const me = await getMe();
    return (
        <>
            <User2 className="h-5 w-5 text-muted-foreground" />
            <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <h2 className="truncate font-bold text-[14px] text-foreground/90">{me.name}</h2>
                <p className="truncate text-xs text-muted-foreground/80 font-medium">{me.email}</p>
            </div>
        </>
    )
}