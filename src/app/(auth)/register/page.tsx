import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export default function RegisterScreen() {
    return (
        <div className="flex w-full justify-center items-center flex-row gap-2">
            <Input className="w-1/5" maxLength={25} />
            <Button size="lg">
                Register
            </Button>
        </div>
    )
}