'use client';

import { ArrowUp, ArrowLeft } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import ChapterNav from '@/app/manga/[id]/chapter/[chapterId]/components/ChapterNav';
import useChapters from '@/app/hooks/useChapters';
import useLocalStorage from '@/hooks/useLocalStorage';
import ChapterControlsPopoverButton from '@/app/manga/[id]/chapter/[chapterId]/components/ChapterControlsPopoverButton';
import ChapterControlsMenuButtonNotification from '@/app/manga/[id]/chapter/[chapterId]/components/ChapterControlsMenuButtonNotification';

type ChapterControlsProps = {
    id: string;
    currentChapter: string;
};

export default function ChapterControls({ id, currentChapter }: ChapterControlsProps) {
    const { chapters } = useChapters(id);

    const [showMenuButtonNotification] = useLocalStorage<boolean>('showMenuButtonNotification', true);

    return (
        <div className="relative">
            <ChapterControlsPopoverButton>
                <Link href={`/manga/${id}`} className="flex items-center justify-center w-full mb-2.5 text-orange-600 font-semibold">
                    <ArrowLeft size={16} strokeWidth={2.25} />
                    <h2 className="text-xs text-center mx-2">RETURN TO TITLE PAGE</h2>
                </Link>

                <ChapterNav id={id} currentChapter={currentChapter} chapters={chapters} />

                <div className="flex items-center justify-between gap-x-2.5 mt-2.5 w-full">
                    <button onClick={() => window.scrollTo(0, 0)} className="flex items-center justify-center grow border gap-x-2 h-9 rounded-md hover:bg-accent">
                        <span className="text-sm">Scroll to top</span>
                        <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
                    </button>

                    <ModeToggle />
                </div>
            </ChapterControlsPopoverButton>

            {showMenuButtonNotification && <ChapterControlsMenuButtonNotification />}
        </div>
    );
}
