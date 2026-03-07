"use client"

import { useEffect, useActionState } from "react";
import { useForm } from "react-hook-form";
import Form from "next/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { CreateUserData, createUserSchema } from "@/data/users/schema";
import { CreateUserState, createUserAction } from "@/data/users/actions";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";

const INITIAL_STATE: CreateUserState = { success: false };

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create"}
        </Button>
    )
}


export function RegistrationForm() {
    const [state, formAction] = useActionState(createUserAction, INITIAL_STATE);

    const {
        register,
        formState: { errors },
        setError,
        reset
    } = useForm<CreateUserData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: { name: "", email: "" },
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.message ?? "User created successfully.");
            redirect("/chat")
        }

        if (!state.errors) {
            toast.error(state.message ?? "Something went wrong");
            return;
        };

        for (const [field, messages] of Object.entries(state.errors)) {
            setError(field as keyof CreateUserData, {
                type: "server",
                message: messages?.[0],
            });
        }
    }, [state, setError]);


    return (
        <Form
            action={formAction}
            className="flex flex-col gap-8 justify-start items-center"
        >
            <Card>
                <CardContent className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            {...register("email")}
                            id="email"
                            placeholder="Enter your email"
                            aria-invalid={!!errors.email}
                        />
                        <FieldDescription>
                            Enter your email. Must be unique
                        </FieldDescription>
                        {errors.email && (
                            <FieldError errors={[errors.email]} />
                        )}
                    </Field>
                    <Field data-invalid={!!errors.name}>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            {...register("name")}
                            id="name"
                            placeholder="Enter your name"
                            aria-invalid={!!errors.name}
                        />
                        <FieldDescription>
                            Enter your name. Must be unique
                        </FieldDescription>
                        {errors.name && (
                            <FieldError errors={[errors.name]} />
                        )}
                    </Field>
                </CardContent>

                <CardFooter>
                    <Field orientation="horizontal">
                        <SubmitButton />
                    </Field>
                </CardFooter>
            </Card>
        </Form>
    );
}
