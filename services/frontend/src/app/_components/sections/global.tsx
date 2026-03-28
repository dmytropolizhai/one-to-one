"use client"

import { Skeleton } from "@/shared/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Globe = dynamic(() => import("@/shared/components/ui/globe").then((mod) => mod.Globe), { ssr: false })

export function GlobalSection() {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        From Ukraine to the World
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 md:text-xl">
                        We are from Mariupol, Ukraine. Here to build privacy-first future for everyone.
                    </p>
                </div>
                <div className="relative flex-1 flex items-center justify-center min-h-[400px] w-full">
                    <Suspense fallback={<Skeleton className="w-full h-full" />}>
                        <Globe className="top-0" />
                    </Suspense>
                </div>
            </div>
        </section>

    )
}