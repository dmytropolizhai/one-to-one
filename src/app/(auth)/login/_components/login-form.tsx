"use client"

import { useEffect, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { requestOtpAction, verifyOtpAction } from "@/data/users/actions";
import { ActionState } from "@/data/types";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { z } from "zod";
import { OTPVerificationInput } from "./otp-verification-input";
import Link from "next/link";
import { MultiStepForm, Step } from "@/shared/components/forms/multi-step-form";

const emailSchema = z.object({
    email: z.string().email("Invalid email"),
});

type EmailData = z.infer<typeof emailSchema>;

type LoginStepContext = {
    email: string;
    emailError?: { message?: string };
    registerEmail: ReturnType<typeof useForm<EmailData>>["register"];
    onContinue: () => void;
};

const INITIAL_OTP_STATE: ActionState<{ email: string }> = { success: false };
const INITIAL_VERIFY_STATE: ActionState<{ email: string; otp: string }> = { success: false };
const LAST_STEP = 1;

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? pendingLabel : label}
        </Button>
    );
}

const steps: Step<LoginStepContext>[] = [
    {
        renderFields({ registerEmail, emailError }) {
            return (
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        {...registerEmail("email")}
                        id="email"
                        placeholder="Enter your email"
                        aria-invalid={!!emailError}
                    />
                    <FieldDescription>
                        Enter the email associated with your account
                    </FieldDescription>
                    {emailError && (
                        <FieldError errors={[emailError]} />
                    )}
                </Field>
            );
        },
        renderActions({ onContinue }) {
            return (
                <Button className="w-full" onClick={onContinue}>
                    Continue
                </Button>
            );
        },
    },
    {
        renderFields({ email }) {
            return (
                <>
                    <input type="hidden" name="email" value={email} readOnly />
                    <Field>
                        <FieldLabel>OTP Verification</FieldLabel>
                        <FieldDescription>
                            Enter the 6-digit code sent to your email
                        </FieldDescription>
                        <OTPVerificationInput />
                    </Field>
                </>
            );
        },
        renderActions() {
            return (
                <SubmitButton label="Verify & Login" pendingLabel="Verifying..." />
            );
        },
    },
];

export function LoginForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState("");
    const [transitioning, setTransitioning] = useState(false);

    const [otpState, otpFormAction] = useActionState(requestOtpAction, INITIAL_OTP_STATE);
    const [verifyState, verifyFormAction] = useActionState(verifyOtpAction, INITIAL_VERIFY_STATE);

    const {
        register,
        formState: { errors },
        setError,
        getValues,
        trigger,
    } = useForm<EmailData>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    });

    useEffect(() => {
        if (!otpState.message && !otpState.errors) return;

        if (otpState.success) {
            toast.success(otpState.message ?? "OTP sent to your email.");
            advanceStep();
        } else {
            if (otpState.message) toast.error(otpState.message);

            if (otpState.errors) {
                for (const [field, messages] of Object.entries(otpState.errors)) {
                    setError(field as keyof EmailData, {
                        type: "server",
                        message: messages?.[0],
                    });
                }
            }
        }
    }, [otpState]);

    useEffect(() => {
        if (verifyState.success) {
            toast.success(verifyState.message ?? "Logged in successfully.");
            redirect("/chat");
        }

        if (verifyState.message && !verifyState.success) {
            toast.error(verifyState.message);
        }
    }, [verifyState]);

    function advanceStep() {
        setTransitioning(true);
        setTimeout(() => {
            setCurrentStep((s) => Math.min(s + 1, LAST_STEP));
            setTransitioning(false);
        }, 250);
    }

    async function handleContinue() {
        const valid = await trigger("email");
        if (!valid) return;
        setEmail(getValues("email"));
        advanceStep();
    }

    const context: LoginStepContext = {
        email,
        emailError: errors.email,
        registerEmail: register,
        onContinue: handleContinue,
    };

    return (
        <MultiStepForm
            steps={steps}
            currentStep={currentStep}
            transitioning={transitioning}
            context={context}
            action={currentStep === 0 ? otpFormAction : verifyFormAction}
            footer={
                <p className="text-sm text-muted-foreground text-center">
                    Don't have an account?{" "}
                    <Link href="/new" className="text-primary hover:underline">
                        Register
                    </Link>
                </p>
            }
        />
    );
}