import { techStack } from '@/app/constants/tech-stack';
import Credits from '@/app/components/Credits';
import GitHubRepo from '@/app/components/GitHubRepo';
import MainFooter from '@/app/components/MainFooter';
import MainHeader from '@/app/components/MainHeader';
import Search from '@/app/components/Search';
import TechStack from '@/app/components/TechStack';
import Title from '@/app/components/Title';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
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
