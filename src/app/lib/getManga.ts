import { baseURL } from '@/app/constants/base-url';

export async function getManga(id: string): Promise<MangaDexGetMangaIdResponse> {
    const response = await fetch(`${baseURL}/api/manga/${id}`);
    if (!response.ok) throw new Error('Failed to fetch data.');
    return response.json();
}
