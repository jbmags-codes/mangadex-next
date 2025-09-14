import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import Loading from '@/app/completed/loading';
import MainLayout from '@/app/components/MainLayout';
import OriginalLanguageFilter from '@/app/components/OriginalLanguageFilter';
import CompletedResults from '@/app/completed/components/CompletedResults';
import CompletedPagination from '@/app/completed/components/CompletedPagination';

export const metadata: Metadata = {
    title: 'MangaDex | jbcodes | Completed manga, manhwa, and manhua.',
    icons: {
        icon: '/mangadex.svg',
    },
    description: 'MangaDex | jbcodes | Completed manga, manhwa, and manhua.',
};

export default async function Completed({ searchParams }: { searchParams: Promise<{ q: string; page: string; originalLanguage: string }> }) {
    const { page, originalLanguage } = await searchParams;

    if (!page) throw new Error('Missing required search params.');

    const limit = 10;

    const offset = (page ? parseInt(page) - 1 : 1 - 1) * limit;

    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';

    const completedResultsResponse = await fetch(
        `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}&includedTagsMode=AND&excludedTagsMode=OR&status%5B%5D=completed${
            originalLanguage?.includes('ko') ? '&originalLanguage%5B%5D=ko' : ''
        }${originalLanguage?.includes('ja') ? '&originalLanguage%5B%5D=ja' : ''}${
            originalLanguage?.includes('zh') ? '&originalLanguage%5B%5D=zh' : ''
        }&availableTranslatedLanguage%5B%5D=en&publicationDemographic%5B%5D=shounen&publicationDemographic%5B%5D=shoujo&publicationDemographic%5B%5D=josei&publicationDemographic%5B%5D=seinen&publicationDemographic%5B%5D=none&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BfollowedCount%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator&hasAvailableChapters=true`,
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

    if (!completedResultsResponse.ok) throw new Error('Oops! Something went wrong while fetching the results. Please try again.');

    const completedResults: MangaDexGetMangaResponse = await completedResultsResponse.json();

    return (
        <MainLayout>
            <Suspense fallback={<Loading />}>
                <OriginalLanguageFilter />

                {/* Spacer */}
                <div className="py-3" />

                <CompletedResults completedResults={completedResults} />

                {/* Spacer */}
                <div className="py-5" />

                <CompletedPagination
                    currentPage={page ? parseInt(page) : 1}
                    totalPages={Math.ceil(completedResults.total / limit) > 999 ? 999 : Math.ceil(completedResults.total / limit)}
                />
            </Suspense>
        </MainLayout>
    );
}
