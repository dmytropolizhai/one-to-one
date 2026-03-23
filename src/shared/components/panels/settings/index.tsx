import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Settings } from "lucide-react";
import { AccountTab } from "./tabs/account";

export async function SettingsPanel() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Settings className="size-4 text-muted-foreground/40 ml-auto group-hover:text-muted-foreground transition-colors" />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>Settings panel to manage your account and preferences</DialogDescription>

                <Tabs defaultValue="account">
                    <TabsList className="w-full">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="appearance" disabled>Appearance</TabsTrigger>
                        <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <AccountTab />
                    </TabsContent>
                    <TabsContent value="appearance">
                        <p>Appearance</p>
                    </TabsContent>
                    <TabsContent value="notifications">
                        <p>Notifications</p>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}