import { Logo } from "@/shared/components/logo";
import { Button } from "@/shared/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/shared/components/ui/navigation-menu";

import Link from "next/link";
const links = [
    {
        href: "/about",
        label: "About",
    },
    {
        href: "/contact",
        label: "Contact",
    },
    {
        href: "/#features",
        label: "Features",
    },
]
export function NavigationBar() {
    return (

        <header className="sticky top-4 z-50 w-full">
            <div
                className="flex items-center justify-between my-8 max-w-4xl mx-auto 
    bg-background/70 backdrop-blur-xl rounded-full py-4 px-8
    shadow-sm border border-border
    mask-[linear-gradient(to_right,transparent,black_5%,black_90%,transparent)]
    "
            >
                <Link href="/" className="mx-8">
                    <Logo className="size-15" />
                </Link>

                <NavigationMenu>
                    <NavigationMenuList>
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