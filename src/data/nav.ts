import { NavItems } from '@/types/nav.interface';
import { Code, Image, Laptop } from 'lucide-react';

export const navItems: NavItems = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Services',
        url: '/services',
        items: [
            {
                title: 'Website Development',
                description: 'Landing page, admin dashboard, and etc.',
                icon: Code,
                url: '/services/website-development',
            },
            {
                title: 'Photo Editing',
                description: 'Clipping path, background removal, and etc.',
                icon: Image,
                url: '/services/photo-editing',
            },
            {
                title: 'Lead Generation',
                description: 'CEO, CMO, and marketing team management.',
                icon: Laptop,
                url: '/services/lead-generation',
            },
        ],
    },
    {
        title: 'About Us',
        url: '/about',
    },
    {
        title: 'Portfolio',
        url: '/portfolio',
    },
];
