import { baseURL } from '@/app/constants/base-url';

export async function getChapterImagesData(chapterId: string): Promise<MangaDexGetAtHomeServerChapterIdResponse> {
    const response = await fetch(`${baseURL}/api/chapter/${chapterId}/images`);
    return response.json();
}
