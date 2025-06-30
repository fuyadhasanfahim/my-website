import { Menu, PhoneCallIcon } from 'lucide-react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { navItems } from '@/data/nav';
import { NavItem } from '@/types/nav.interface';

export default function Navbar() {
    return (
        <section className="py-4 padding-x border-b">
            <div className="container">
                <nav className="hidden justify-between lg:flex">
                    <Link href={'/'}>
                        <span className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tighter">
                            My Website
                        </span>
                    </Link>
                    <div className="flex items-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navItems.map((item) => renderMenuItem(item))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <Button asChild size={'lg'}>
                        <Link href={'/contact-us'}>
                            <PhoneCallIcon />
                            <span>Contact Us</span>
                        </Link>
                    </Button>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link href={'/'}>
                            <span className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tighter">
                                My Website
                            </span>
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link href={'/'}>
                                            <span className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tighter">
                                                My Website
                                            </span>
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {navItems.map((item) =>
                                            renderMobileMenuItem(item)
                                        )}
                                    </Accordion>

                                    <Button asChild size={'lg'}>
                                        <Link href={'/contact-us'}>
                                            <PhoneCallIcon />
                                            <span>Contact Us</span>
                                        </Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
}

const renderMenuItem = (item: NavItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink
                            asChild
                            key={subItem.title}
                            className="w-80"
                        >
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: NavItem) => {
    if (item.items) {
        return (
            <AccordionItem
                key={item.title}
                value={item.title}
                className="border-b-0"
            >
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link
            key={item.title}
            href={item.url}
            className="text-md font-semibold"
        >
            {item.title}
        </Link>
    );
};

const SubMenuLink = ({ item }: { item: NavItem }) => {
    return (
        <Link
            className="flex flex-row items-center gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground group/sub-menu-link"
            href={item.url}
        >
            <div className="text-foreground p-2 rounded-full bg-accent group-hover/sub-menu-link:bg-white">
                {item.icon && <item.icon className="size-5" />}
            </div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-sm leading-snug text-muted-foreground">
                        {item.description}
                    </p>
                )}
            </div>
        </Link>
    );
};
