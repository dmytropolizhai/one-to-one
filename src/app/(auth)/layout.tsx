import { PropsWithChildren } from "react";
import Background from "@/shared/components/background";
import { Toaster } from "@/shared/components/ui/sonner";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <main className="flex flex-col w-full min-h-screen justify-center items-center gap-4 p-4">
            <Background />
            {children}
            <Toaster position="top-center" />
        </main>
    )
}