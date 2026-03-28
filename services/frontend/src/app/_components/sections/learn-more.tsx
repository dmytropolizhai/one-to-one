"use client"

import { BrickWallShield, Focus, Globe } from "lucide-react";
import { Particles } from "@/shared/components/ui/particles";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { BorderBeam } from "@/shared/components/ui/border-beam";
import { Button } from "@/shared/components/ui/button";

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <Card className="overflow-hidden relative">
            <CardHeader>
                <CardAction>
                    <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                        {icon}
                    </div>
                </CardAction>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <BorderBeam duration={6} size={400} className="from-transparent via-primary/50 to-transparent" />
        </Card>
    )
}

export function LearnMoreSection() {
    return (
        <section id="learn-more" className="relative w-full py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-3">
                    <FeatureCard
                        icon={<BrickWallShield />}
                        title="End-to-End Privacy"
                        description="Your conversations are yours alone. We encrypt everything so no one else can read your messages."
                    />
                    <FeatureCard
                        icon={<Focus />}
                        title="Meaningful Focus"
                        description="Designed specifically for one-to-one interaction. No distracted group chats or endless scrolls."
                    />
                    <FeatureCard
                        icon={<Globe />}
                        title="Connect with anyone using specific public ID"
                        description="No need to share phone numbers. Just share your public ID and start chatting."
                    />
                </div>
            </div>
            <Particles
                className="absolute inset-0 z-[-1]"
                quantity={100}
                ease={80}
                color="#ffffff"
                refresh
            />
        </section>
    )
}