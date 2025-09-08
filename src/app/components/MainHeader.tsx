import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { WebsiteLogo } from '../../../public/jbcodes-logo';

export default function MainHeader() {
    return (
        <header className="flex flex-col justify-around items-center w-full z-[1000] px-6 h-16 sticky top-0 bg-background/70 dark:bg-background/70 shadow-[inset_0_-1px_0_0_#eaeaea] dark:shadow-[inset_0_-1px_0_0_#1A1A1A] transform-gpu backdrop-saturate-150 backdrop-blur-lg">
            <nav className="flex items-center justify-between w-full max-w-5xl mx-auto">
                <Link href="https://www.jbcodes.com" className="flex items-center gap-x-2.5">
                    <div className="text-black dark:text-white">
                        <WebsiteLogo />
                    </div>

                    <h1 className="font-semibold text-xl tracking-tighter select-none">jbcodes</h1>
                </Link>

                <div className="flex items-center gap-x-4 lg:gap-x-10">
                    <ModeToggle />
                </div>
            </nav>
        </header>
    );
}
