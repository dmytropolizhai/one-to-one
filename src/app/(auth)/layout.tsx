import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <main className="flex flex-col w-full min-h-screen justify-center items-center gap-4 p-4">
            {children}
        </main>
    )
}