import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type GitHubRepoProps = {
    link: string;
    className?: string;
};

export default function GitHubRepo({ link, className }: GitHubRepoProps) {
    return (
        <Link href={link} target="_blank" className={cn('flex items-center justify-center gap-x-2 px-8 h-12 w-fit rounded-full bg-[#0A7EA4]', className)}>
            <span className="text-white text-sm font-semibold uppercase">Project Repository</span>
            <Image src="/github.svg" alt="GitHub logo" width={32} height={32} className="invert" />
        </Link>
    );
}
