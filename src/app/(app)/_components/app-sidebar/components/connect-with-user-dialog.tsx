import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Plus } from "lucide-react";

import { Input } from "@/shared/components/ui/input";

export function ConnectWithUserDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center size-6 text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-all rounded-md" variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
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
                            placeholder="e.g. 123456"
                            className="h-12"
                        />
                    </div>
                </div>
                <DialogFooter className="flex justify-end gap-4">
                    <DialogClose asChild>
                        <Button variant="ghost">Close</Button>
                    </DialogClose>
                    <Button>Send Request</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}