import { headers } from 'next/headers';
import LatestUpdatesCard from './LatestUpdatesCard';

export default async function LatestUpdates() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';

    const response = await fetch(
        'https://api.mangadex.org/manga?limit=12&offset=0&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BupdatedAt%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator&hasAvailableChapters=true',
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
                <h1 className="font-semibold text-xl tracking-tight">Latest Updates</h1>
                <p className="text-red-600 xxs:text-sm">
                    Could not load the list of latest updates. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const latestUpdates: MangaDexGetMangaResponse = await response.json();

    return (
        latestUpdates.data.length > 0 && (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Latest Updates</h1>

                <div className="flex flex-col md:flex-row md:flex-wrap justify-start xs:justify-between sm:justify-start md:justify-between w-full gap-y-3.5 xs:gap-y-4 md:gap-4">
                    {latestUpdates.data.map((mangaDexGetMangaDataItem, index) => (
                        <LatestUpdatesCard key={index} mangaDexGetMangaDataItem={mangaDexGetMangaDataItem} />
                    ))}
                </div>
            </div>
        )
    );
}
