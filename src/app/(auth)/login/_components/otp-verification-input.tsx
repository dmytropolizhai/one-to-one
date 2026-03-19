import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/shared/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";

export function OTPVerificationInput() {
    const [value, setValue] = useState<string>("")

    return (
        <>
            <input type="hidden" name="otp" value={value} readOnly />
            <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                onChange={setValue}
                value={value}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup >
            </InputOTP>
        </>
    )
}