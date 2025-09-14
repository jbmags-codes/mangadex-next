import { baseURL } from '@/app/constants/base-url';
import ChapterImagesContainerAndCounter from '@/app/manga/[id]/chapter/[chapterId]/components/ChapterImagesContainerAndCounter';

async function getChapterImages(chapterId: string) {
    const response = await fetch(`${baseURL}/api/chapter/${chapterId}/images`);
    if (!response.ok) throw new Error('Failed to fetch data.');
    return response.json();
}

type ChapterImagesProps = {
    title?: string;
    chapterId: string;
    currentChapter: string;
};

export default async function ChapterImages({ title, chapterId, currentChapter }: ChapterImagesProps) {
    const chapterImagesData = getChapterImages(chapterId);
    const chapterImages: MangaDexGetAtHomeServerChapterIdResponse = await chapterImagesData;

    const imagesBaseUrl = chapterImages.baseUrl;
    const hash = chapterImages.chapter.hash;
    const images = chapterImages.chapter.data;

    return <ChapterImagesContainerAndCounter title={title} currentChapter={currentChapter} baseUrl={imagesBaseUrl} hash={hash} images={images} />;
}
