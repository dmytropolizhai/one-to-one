import { getMe } from "@/data/users/actions";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { AppSidebar } from "./_components/app-sidebar";

export default async function AppLayout({ children }: PropsWithChildren) {
    const user = await getMe();

    if (!user) {
        redirect("/new")
    }

    return (
        <SidebarProvider defaultOpen>
            <AppSidebar />
            <SidebarTrigger />
            {children}
        </SidebarProvider>
    );
}