import { LucideIcon } from 'lucide-react';

export interface NavItem {
    title: string;
    description?: string;
    icon?: LucideIcon;
    url: string;
    items?: NavItems;
}

export interface NavItems extends Array<NavItem> {}
