"use client"

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { connectWithUserAction } from "@/data/chats/actions";
import { toast } from "sonner";
import Form from "next/form";

export function ConnectWithUserDialog() {
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(connectWithUserAction, {
        success: false,
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            setOpen(false);
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center size-6 text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-all rounded-md" variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <Form action={formAction}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Connect with User</DialogTitle>
                        <DialogDescription className="text-muted-foreground/70">
                            Enter a unique public ID to start a new private conversation.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">User Public ID</span>
                            <Input
                                name="publicId"
                                placeholder="Paste Public ID here"
                                className="h-12"
                                required
                            />
                            {state.errors?.publicId && (
                                <p className="text-xs text-destructive ml-1">{state.errors.publicId[0]}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="flex justify-end gap-4">
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">Close</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Connecting..." : "Send Request"}
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}