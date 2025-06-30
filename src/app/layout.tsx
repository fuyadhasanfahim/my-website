import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    weight: ['500', '700'],
    variable: '--font-montserrat',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn('antialiased', montserrat.variable)}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
