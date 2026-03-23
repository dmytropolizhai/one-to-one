import { LogoutButton } from "@/app/(app)/_components/logout-button";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { auth } from "@/shared/lib/auth";

export async function AccountTab() {
    const me = await auth();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="email">
                    <TabsList className="w-full">
                        <TabsTrigger value="email">Email</TabsTrigger>
                        <TabsTrigger value="name">Name</TabsTrigger>
                    </TabsList>
                    <TabsContent value="email">
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <FieldContent>
                                <Input disabled value={me.email} />
                            </FieldContent>
                            <FieldDescription>Email address associated with your account</FieldDescription>
                        </Field>
                    </TabsContent>
                    <TabsContent value="name">
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            <FieldContent className="flex-row">
                                <Input value={me.name} disabled />
                            </FieldContent>
                            <FieldDescription>Name associated with your account</FieldDescription>
                        </Field>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter>
                <div className="flex items-center justify-between text-muted-foreground w-full">
                    <p>Want to logout?</p>
                    <LogoutButton />
                </div>
            </CardFooter>
        </Card>
    )
}