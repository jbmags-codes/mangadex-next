import { techStack } from '../constants/tech-stack';
import Credits from './Credits';
import GitHubRepo from './GitHubRepo';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import Search from './Search';
import TechStack from './TechStack';
import Title from './Title';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}
            {/* <ScrollToTop /> */}
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}

            <MainHeader />

            <main className="flex flex-col w-full min-h-[100svh] sm:min-h-[100dvh] py-12 xs:py-14 sm:py-16 px-6">
                <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
                    <Title />

                    {/* Spacer */}
                    <div className="py-2.5" />

                    <Search />

                    {/* Spacer */}
                    <div className="py-3 md:py-4" />

                    {children}

                    {/* Spacer */}
                    <div className="py-3 xs:py-4 sm:py-5" />

                    <Credits />

                    {/* Spacer */}
                    <div className="py-3 xs:py-4 sm:py-5" />

                    <TechStack techStack={techStack} />

                    {/* Spacer */}
                    <div className="py-3 xs:py-4 sm:py-5" />

                    <GitHubRepo link="https://github.com/jbmags-codes/mangadex-nextjs" />
                </div>
            </main>

            <MainFooter />
        </>
    );
}
