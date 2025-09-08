import { headers } from 'next/headers';
import { featuredIds } from '@/app/constants/featured-ids';
import FeaturedCarousel from '@/app/components/FeaturedCarousel';

export default async function Featured() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';

    let idsQuery = '';
    featuredIds.forEach((id) => (idsQuery += `ids%5B%5D=${id}&`));

    const response = await fetch(
        `https://api.mangadex.org/manga?limit=100&includedTagsMode=AND&excludedTagsMode=OR&${idsQuery}contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BfollowedCount%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator`,
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
            <div className="flex flex-col w-full">
                <h1 className="font-semibold text-xl tracking-tight mb-4">Featured</h1>
                <p className="text-red-600 text-sm xs:text-base">
                    Could not load featured manga, manhwa, and manhua. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const featured: MangaDexGetMangaResponse = await response.json();

    return (
        featured.data.length > 0 && (
            <div className="flex flex-col w-full">
                <h1 className="font-semibold text-xl tracking-tight mb-4">Featured</h1>

                <div className="flex items-center justify-center">
                    <FeaturedCarousel featured={featured.data} />
                </div>
            </div>
        )
    );
}
