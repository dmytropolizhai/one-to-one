
"use client"

import Form from "next/form";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { FieldGroup } from "@/shared/components/ui/field";
import { Step } from "./types";

/**
 * Props for MultiStepForm
 */
export type MultiStepFormProps<TContext> = {
    steps: Step<TContext>[];
    currentStep: number;
    transitioning: boolean;
    context: TContext;
    action: (payload: FormData) => void;
    footer?: React.ReactNode;
};

/**
 * Multistep form component with animation on transition
 * @param steps - Array of steps
 * @param currentStep - Current step
 * @param transitioning - Whether the form is transitioning
 * @param context - Context for the form
 * @param action - Action to perform
 * @param footer - Footer for the form
 * @returns MultiStepForm component
 */
export function MultiStepForm<TContext>({
    steps,
    currentStep,
    transitioning,
    context,
    action,
    footer,
}: MultiStepFormProps<TContext>) {
    const safeStep = Math.min(currentStep, steps.length - 1);
    const activeStep = steps[safeStep];

    return (
        <Form
            action={action}
            className="flex flex-col gap-8 justify-start items-center"
        >
            <Card className="w-[350px] overflow-hidden">
                <CardContent className="pt-6">
                    <FieldGroup
                        className="step-container"
                        data-transitioning={transitioning}
                    >
                        {activeStep.renderFields(context)}
                    </FieldGroup>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col gap-4 w-full">
                        {activeStep.renderActions(context)}
                        {footer}
                    </div>
                </CardFooter>
            </Card>
        </Form>
    );
}

export type { Step } from "./types";
export { useMultiStepForm } from "./hooks";