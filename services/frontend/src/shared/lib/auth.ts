import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { redis } from "./redis";
import { User } from "@/generated/prisma/client";

export async function auth(): Promise<User> {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) redirect("/login");

    const cacheKey = `user:${userId}`;
    
    // Check cache
    try {
        const cachedUser = await redis.get(cacheKey);
        if (cachedUser) {
            return JSON.parse(cachedUser);
        }
    } catch (err) {
        console.error("Redis error in auth:", err);
    }

    const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
    });

    if (!user) redirect("/login");

    // Update cache
    try {
        await redis.set(cacheKey, JSON.stringify(user), {
            EX: 3600, // 1 hour TTL
        });
    } catch (err) {
        console.error("Redis cache error:", err);
    }

    return user;
}