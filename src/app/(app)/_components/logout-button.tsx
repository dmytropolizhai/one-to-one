"use client"

import { logoutAction } from "@/data/users/actions"
import { Button, ButtonProps } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function LogoutButton({ className, ...rest }: ButtonProps) {
    const router = useRouter()

    async function handleLogout() {
        await logoutAction()
        router.push("/login")
    }

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleLogout}
            className={cn("ml-auto hover:text-destructive group/logout", className)}
            {...rest}
        >
            <LogOut className="size-4 transition-colors group-hover/logout:text-destructive" />
        </Button>
    )
}