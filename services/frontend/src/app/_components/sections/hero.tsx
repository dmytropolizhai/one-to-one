"use client"

import { Button } from "@/shared/components/ui/button";
import { TypingAnimation } from "@/shared/components/ui/typing-animation";
import { cn } from "@/shared/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";

const DotPattern = dynamic(() => import("@/shared/components/ui/dot-pattern").then((mod) => mod.DotPattern), { ssr: false })

const words = [
    "Connect Privately",
    "Stay Focused",
    "Privacy First",
]

export function HeroSection() {
    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
            <div className="z-10 flex flex-col items-center text-center px-4">
                <TypingAnimation
                    words={words}
                    className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
                    duration={50}
                    loop
                >
                    Connect Privately
                </TypingAnimation>
                <p className="mt-4 max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                    A minimalist space for deep one-to-one conversations. No noise, just connection.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link href="/new">
                        <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="#learn-more">
                        <Button size="lg" variant="outline">Learn More</Button>
                    </Link>
                </div>
            </div>

            <DotPattern className={cn(
                "mask-[radial-gradient(500px_circle_at_center,white,transparent)]"
            )} />
        </section>
    )
}