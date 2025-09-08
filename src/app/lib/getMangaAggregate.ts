import { baseURL } from '@/app/constants/base-url';

export async function getMangaAggregate(id: string): Promise<MangaDexGetMangaIdAggregateResponse> {
    const response = await fetch(`${baseURL}/api/manga/${id}/aggregate`);
    return response.json();
}
