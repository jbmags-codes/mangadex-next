import { headers } from 'next/headers';
import { Suspense } from 'react';
import Loading from '@/app/search/loading';
import MainLayout from '@/app/components/MainLayout';
import SearchResults from '@/app/components/SearchResults';
import SearchPagination from '@/app/components/SearchPagination';
import OriginalLanguageFilter from '@/app/components/OriginalLanguageFilter';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string; page: string; originalLanguage: string }> }) {
    const { q, page, originalLanguage } = await searchParams;

    if (!q || !page) throw new Error('Missing required search params.');

    const limit = 10;
    const offset = (page ? parseInt(page) - 1 : 1 - 1) * limit;

    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';

    const searchResultsResponse = await fetch(
        `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}${q ? `&title=${q}` : ''}&includedTagsMode=AND&excludedTagsMode=OR${
            originalLanguage?.includes('ko') ? '&originalLanguage%5B%5D=ko' : ''
        }${originalLanguage?.includes('ja') ? '&originalLanguage%5B%5D=ja' : ''}${
            originalLanguage?.includes('zh') ? '&originalLanguage%5B%5D=zh' : ''
        }&availableTranslatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BfollowedCount%5D=desc&order%5Brelevance%5D=desc&order%5BlatestUploadedChapter%5D=desc&order%5BupdatedAt%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator&hasAvailableChapters=true`,
        {
            method: 'GET',
            headers: {
                'User-Agent': userAgent,
                Accept: 'application/json',
            },
            next: {
                revalidate: 3600, // 1 hour
            },
        }
    );

    if (!searchResultsResponse.ok) throw new Error('Oops! Something went wrong while fetching the results. Please try again.');

    const searchResults = await searchResultsResponse.json();

    return (
        <MainLayout>
            <Suspense fallback={<Loading />}>
                <OriginalLanguageFilter />

                {/* Spacer */}
                <div className="py-3" />

                <SearchResults searchResults={searchResults} />

                {/* Spacer */}
                <div className="py-5" />

                <SearchPagination
                    currentPage={page ? parseInt(page) : 1}
                    totalPages={Math.ceil(searchResults.total / limit) > 999 ? 999 : Math.ceil(searchResults.total / limit)}
                    query={q}
                />
            </Suspense>
        </MainLayout>
    );
}
