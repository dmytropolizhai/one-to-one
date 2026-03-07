import { getMe } from "@/data/users/actions";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AppLayout({ children }: PropsWithChildren) {
    const user = await getMe();

    if (!user) {
        redirect("/new")
    }

    return children;
}