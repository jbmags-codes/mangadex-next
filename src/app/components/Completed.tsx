import Link from 'next/link';
import CompletedCard from './CompletedCard';
import { headers } from 'next/headers';
import { ArrowRight } from 'lucide-react';

export default async function Completed() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';

    const limit = 12;
    const offset = 0;

    const response = await fetch(
        `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}&includedTagsMode=AND&excludedTagsMode=OR&status%5B%5D=completed&availableTranslatedLanguage%5B%5D=en&publicationDemographic%5B%5D=shounen&publicationDemographic%5B%5D=shoujo&publicationDemographic%5B%5D=josei&publicationDemographic%5B%5D=seinen&publicationDemographic%5B%5D=none&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BfollowedCount%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator&hasAvailableChapters=true`,
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
                <h1 className="font-semibold text-xl tracking-tight">Completed</h1>
                <p className="text-red-600 xxs:text-sm">
                    Could not load the list of completed manga, manhwa, and manhua. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const completed: MangaDexGetMangaResponse = await response.json();

    return (
        completed.data.length > 0 && (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Completed</h1>

                <div className="flex flex-col md:flex-row md:flex-wrap justify-start xs:justify-between sm:justify-start md:justify-between w-full gap-y-3.5 xs:gap-y-4 md:gap-4">
                    {completed.data.map((mangaDexGetMangaDataItem, index) => (
                        <CompletedCard key={index} mangaDexGetMangaDataItem={mangaDexGetMangaDataItem} />
                    ))}
                </div>

                <Link
                    href="/completed?page=1"
                    className="flex items-center justify-center gap-x-2 h-10 w-full bg-orange-600 text-white text-sm uppercase font-medium rounded-lg hover:opacity-80 duration-300"
                >
                    <span>See All</span>
                    <ArrowRight size={16} />
                </Link>
            </div>
        )
    );
}
