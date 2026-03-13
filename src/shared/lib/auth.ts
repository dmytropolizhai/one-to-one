import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { User } from "@/generated/prisma/client";

export async function auth(): Promise<User> {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
    });

    if (!user) redirect("/login");

    return user;
}