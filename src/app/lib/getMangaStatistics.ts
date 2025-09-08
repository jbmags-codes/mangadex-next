import { baseURL } from '@/app/constants/base-url';

export async function getMangaStatistics(id: string): Promise<MangaDexGetStatisticsMangaUUIDResponse> {
    const response = await fetch(`${baseURL}/api/manga/${id}/statistics`);
    return response.json();
}
