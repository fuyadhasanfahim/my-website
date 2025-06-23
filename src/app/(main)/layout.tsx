import { Navbar } from '@/components/shared/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            {children}
        </>
    );
}
