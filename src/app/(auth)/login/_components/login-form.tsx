"use client"

import { useEffect, useActionState } from "react";
import { useForm } from "react-hook-form";
import Form from "next/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { loginAction } from "@/data/users/actions";
import { ActionState } from "@/data/types";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
});

type LoginData = z.infer<typeof loginSchema>;

const INITIAL_STATE: ActionState<LoginData> = { success: false };

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Logging in..." : "Login"}
        </Button>
    )
}

export function LoginForm() {
    const [state, formAction] = useActionState(loginAction, INITIAL_STATE);

    const {
        register,
        formState: { errors },
        setError,
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "" },
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.message ?? "Logged in successfully.");
            redirect("/chat")
        }

        if (state.message && !state.success) {
            toast.error(state.message);
        }

        if (state.errors) {
            for (const [field, messages] of Object.entries(state.errors)) {
                setError(field as keyof LoginData, {
                    type: "server",
                    message: messages?.[0],
                });
            }
        }
    }, [state, setError]);

    return (
        <Form
            action={formAction}
            className="flex flex-col gap-8 justify-start items-center"
        >
            <Card className="w-[350px]">
                <CardContent className="pt-6">
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            {...register("email")}
                            id="email"
                            placeholder="Enter your email"
                            aria-invalid={!!errors.email}
                        />
                        <FieldDescription>
                            Enter the email associated with your account
                        </FieldDescription>
                        {errors.email && (
                            <FieldError errors={[errors.email]} />
                        )}
                    </Field>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col gap-4 w-full">
                        <SubmitButton />
                        <p className="text-sm text-muted-foreground text-center">
                            Don't have an account?{" "}
                            <a href="/new" className="text-primary hover:underline">
                                Register
                            </a>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </Form>
    );
}