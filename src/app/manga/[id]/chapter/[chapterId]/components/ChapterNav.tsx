'use client';

import { useState } from 'react';
import ChapterGapDialog from '@/app/manga/[id]/chapter/[chapterId]/components/ChapterGapDialog';
import ChapterNavPrevButton from '@/app/manga/[id]/chapter/[chapterId]/components/ChapterNavPrevButton';
import ChapterNavSelect from '@/app/manga/[id]/chapter/[chapterId]/components/ChapterNavSelect';
import ChaperNavNextButton from '@/app/manga/[id]/chapter/[chapterId]/components/ChaperNavNextButton';

type ChapterNavProps = {
    id: string;
    currentChapter: string;
    chapters: Chapter[];
};

export default function ChapterNav({ id, currentChapter, chapters }: ChapterNavProps) {
    const index = chapters.findIndex((chapter) => chapter.chapter === currentChapter);

    const prevChapterId = chapters[index - 1]?.id;
    const prevChapterNumber = chapters[index - 1]?.chapter ? parseFloat(chapters[index - 1]?.chapter) : null;

    const currentChapterNumber = chapters[index]?.chapter ? parseFloat(chapters[index]?.chapter) : null;

    const nextChapterId = chapters[index + 1]?.id;
    const nextChapterNumber = chapters[index + 1]?.chapter ? parseFloat(chapters[index + 1]?.chapter) : null;

    const [isPreviousButtonClicked, setIsPreviousButtonClicked] = useState<boolean>(false);
    const [isNextButtonClicked, setIsNextButtonClicked] = useState<boolean>(false);
    const [openChapterGapDialog, setOpenChapterGapDialog] = useState<boolean>(false);

    return (
        <>
            <ChapterGapDialog
                openChapterGapDialog={openChapterGapDialog}
                setOpenChapterGapDialog={setOpenChapterGapDialog}
                prevChapterNumber={prevChapterNumber}
                currentChapterNumber={currentChapterNumber}
                nextChapterNumber={nextChapterNumber}
                isPreviousButtonClicked={isPreviousButtonClicked}
                setIsPreviousButtonClicked={setIsPreviousButtonClicked}
                isNextButtonClicked={isNextButtonClicked}
                setIsNextButtonClicked={setIsNextButtonClicked}
                prevRoute={`/manga/${id}/chapter/${prevChapterId}`}
                nextRoute={`/manga/${id}/chapter/${nextChapterId}`}
            />

            <div className="flex items-center justify-between w-full gap-x-2.5">
                <ChapterNavPrevButton
                    id={id}
                    index={index}
                    prevChapterId={prevChapterId}
                    isPreviousButtonClicked={isPreviousButtonClicked}
                    setIsPreviousButtonClicked={setIsPreviousButtonClicked}
                    currentChapterNumber={currentChapterNumber}
                    prevChapterNumber={prevChapterNumber}
                    openChapterGapDialog={openChapterGapDialog}
                    setOpenChapterGapDialog={setOpenChapterGapDialog}
                />

                <ChapterNavSelect id={id} currentChapter={currentChapter} chapters={chapters} />

                <ChaperNavNextButton
                    id={id}
                    index={index}
                    nextChapterId={nextChapterId}
                    isNextButtonClicked={isNextButtonClicked}
                    setIsNextButtonClicked={setIsNextButtonClicked}
                    currentChapterNumber={currentChapterNumber}
                    nextChapterNumber={nextChapterNumber}
                    openChapterGapDialog={openChapterGapDialog}
                    setOpenChapterGapDialog={setOpenChapterGapDialog}
                    numberOfChapters={chapters.length}
                />
            </div>
        </>
    );
}
