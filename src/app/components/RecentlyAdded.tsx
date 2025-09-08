import { headers } from 'next/headers';
import RecentlyAddedCarousel from '@/app/components/RecentlyAddedCarousel';

export default async function RecentlyAdded() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';

    const response = await fetch(
        'https://api.mangadex.org/manga?limit=12&offset=0&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BcreatedAt%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator&hasAvailableChapters=true',
        {
            method: 'GET',
            headers: {
                'User-Agent': userAgent,
                Accept: 'application/json',
            },
            next: {
                revalidate: 3600,
            },
        }
    );

    if (!response.ok)
        return (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Recently Added</h1>
                <p className="text-red-600 text-sm xs:text-base">
                    Could not load the list of recently added. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const recentlyAdded: MangaDexGetMangaResponse = await response.json();

    return (
        recentlyAdded.data.length > 0 && (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Recently Added</h1>

                <div className="flex items-center justify-center">
                    <RecentlyAddedCarousel recentlyAdded={recentlyAdded.data} />
                </div>
            </div>
        )
    );
}
