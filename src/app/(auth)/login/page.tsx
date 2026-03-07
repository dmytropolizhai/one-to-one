import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Suspense } from "react";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
    return (
        <div className="flex w-full justify-center items-center flex-row gap-8">
            <header className="flex flex-col">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-muted-foreground">Return to your account</p>
            </header>
            <div className="h-20">
                <Separator orientation="vertical" className="h-full" />
            </div>
            <Suspense fallback={<Skeleton className="w-full h-10" />}>
                <LoginForm />
            </Suspense>
        </div>
    )
}