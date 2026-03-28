import { Logo } from "@/shared/components/logo";
import { Button } from "@/shared/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia } from "@/shared/components/ui/item";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/shared/components/ui/navigation-menu";
import { ProgressiveBlur } from "@/shared/components/ui/progressive-blur";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";

import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
const links = [
    {
        href: "/contact",
        label: "Contact",
    },
    {
        href: "/#features",
        label: "Features",
    },
    {
        href: "/about",
        label: "About",
    },
]

const features = [
    {
        title: "The Reality of Modern Communication",
        description: "Digital communication was not built for privacy—it was built for scale.",
        href: "#reality",
    },
    {
        title: "The Problem",
        description: "Your conversations are scattered across platforms that prioritize engagement over trust.",
        href: "#problem",
    },
    {
        title: "A Different Approach",
        description: "One-to-one is built on a simple principle: privacy should not depend on circumstance.",
        href: "#approach",
    },
    {
        title: "Privacy Philosophy",
        description: "Privacy is not a feature. It is the foundation.",
        href: "#privacy",
    },
    {
        title: "Security Philosophy",
        description: "Security is not a claim—it is an architecture.",
        href: "#security",
    },
    {
        title: "Trust Through Transparency",
        description: "Trust should be verifiable—not assumed.",
        href: "#transparency",
    },
    {
        title: "Why Open Source Matters",
        description: "No hidden mechanisms.",
        href: "#open-source",
    },
    {
        title: "Data Minimization",
        description: "We intentionally collect as little data as possible.",
        href: "#data",
    },
    {
        title: "Connection Reimagined",
        description: "True connection requires trust.",
        href: "#connection",
    },
    {
        title: "The Experience",
        description: "A single conversation, undisturbed.",
        href: "#experience",
    },
    {
        title: "Principles",
        description: "Privacy over exposure.",
        href: "#principles",
    },
    {
        title: "Differentiation",
        description: "Not another social network.",
        href: "#difference",
    },
    {
        title: "Trust Statement",
        description: "Your conversations are not a product.",
        href: "#trust",
    },
    {
        title: "Vision",
        description: "We believe the future of communication is smaller, safer, and more intentional.",
        href: "#vision",
    },
];

function ListItem({ title, children, href, ...props }: ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink href={href}>
          <Item>
            <ItemContent>
                <ItemHeader>{title}</ItemHeader>
                <ItemDescription>{children}</ItemDescription>
            </ItemContent>
            <ItemMedia>
                <ArrowRight className="size-5" />
            </ItemMedia>
          </Item>
      </NavigationMenuLink>
    </li>
  )
}


export function NavigationBar() {
    return (
        <header className="sticky top-4 z-50 w-full">
            <div className="relative flex items-center justify-between my-8 max-w-4xl mx-auto py-4 px-8">
                <div
                    className="
                        absolute inset-0 -z-10
                        bg-background/80 backdrop-blur-xl rounded-full
                        inset-shadow-xl shadow-sm border-b border-border
                        mask-[linear-gradient(to_right,transparent,black_5%,black_90%,transparent)]
                    "
                />
                <Link href="/" className="mx-8">
                    <Logo className="size-15" />
                </Link>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ScrollArea className="relative h-[400px] overflow-hidden">
                                    <ul className="w-96">
                                        {features.map(feat => (
                                            <ListItem 
                                                key={feat.href}
                                                title={feat.title}
                                                href={feat.href}
                                            >
                                                {feat.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </ScrollArea>
                                <ProgressiveBlur position="bottom" height="20%"/>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        {links.map((link) => (
                            <NavigationMenuItem key={link.href}>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href={link.href}
                                >
                                    {link.label}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex gap-2 flex-1 justify-end mr-8">
                    <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/new">Get Started</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}