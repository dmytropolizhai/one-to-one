import { Separator } from "@/shared/components/ui/separator";

import { RegistrationForm } from "./_components/registration-form";
import { Suspense } from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function NewMemberPage() {
    return (
        <div className="flex w-full justify-center items-center flex-row gap-8">
            <header className="flex flex-col">
                <h1 className="text-3xl font-bold">Become a new member</h1>
                <p className="text-muted-foreground">Enter your nickname to create an account</p>
            </header>
            <div className="h-20">
                <Separator orientation="vertical" className="h-full" />
            </div>
            <Suspense fallback={<Skeleton className="w-full h-10" />}>
                <RegistrationForm />
            </Suspense>
        </div>
    )
}