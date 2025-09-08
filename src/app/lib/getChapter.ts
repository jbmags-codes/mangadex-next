import { baseURL } from '@/app/constants/base-url';

export async function getChapter(id: string): Promise<MangaDexGetChapterIdResponse> {
    const response = await fetch(`${baseURL}/api/chapter/${id}`);
    if (!response.ok) throw new Error('Failed to fetch data.');
    return response.json();
}
