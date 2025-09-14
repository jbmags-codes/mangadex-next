import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { baseURL } from '@/app/constants/base-url';
import { getManga } from '@/app/lib/getManga';
import MainLayout from '@/app/components/MainLayout';
import CardImage from '@/app/components/CardImage';
import CardTitle from '@/app/components/CardTitle';
import CardOriginalLanguage from '@/app/components/CardOriginalLanguage';
import CardStatistics from '@/app/components/CardStatistics';
import CardLastUpdate from '@/app/components/CardLastUpdate';
import CardDescription from '@/app/components/CardDescription';
import Author from '@/app/manga/[id]/components/Author';
import Artist from '@/app/manga/[id]/components/Artist';
import Genres from '@/app/manga/[id]/components/Genres';
import Themes from '@/app/manga/[id]/components/Themes';
import Format from '@/app/manga/[id]/components/Format';
import Chapters from '@/app/manga/[id]/components/Chapters';

// Dynamic metadata
export async function generateMetadata({ params }: MangaProps) {
    const { id } = await params;

    const mangaData = getManga(id);
    const manga = await mangaData;

    const relationships = manga.data.relationships;
    const coverArtFileName = relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName as string | undefined;
    const originalLanguage = manga.data.attributes?.originalLanguage;
    const altTitles = manga.data.attributes.altTitles;
    const englishTitle = manga.data.attributes?.title?.en;
    const japaneseTitle = manga.data.attributes?.title?.ja;

    const title =
        originalLanguage === 'ja' && altTitles.find((title) => title.hasOwnProperty('en'))?.en
            ? altTitles.find((title) => title.hasOwnProperty('en'))?.en
            : englishTitle || japaneseTitle;

    const description = manga.data.attributes?.description?.en;

    return {
        metadataBase: new URL(baseURL),
        title: `jbmagx | MangaDex | ${title}`,
        description: description,
        openGraph: {
            images: [`https://mangadex.org/covers/${id}/${coverArtFileName}.512.jpg`],
        },
    };
}

type MangaProps = {
    params: Promise<{ id: string }>;
};

export default async function Manga({ params }: MangaProps) {
    const { id } = await params;

    const mangaData = getManga(id);
    const manga = await mangaData;

    if (!manga.data) throw new Error('Manga data not found.');

    const relationships = manga.data.relationships;
    const coverArtFileName = relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName as string | undefined;
    const originalLanguage = manga.data.attributes?.originalLanguage;
    const altTitles = manga.data.attributes.altTitles;
    const englishTitle = manga.data.attributes?.title?.en;
    const japaneseTitle = manga.data.attributes?.title?.ja;
    const updatedAt = manga.data.attributes?.updatedAt;
    const tags = manga.data.attributes?.tags;
    const description = manga.data.attributes?.description?.en;

    return (
        <MainLayout>
            <div className="flex flex-col w-full">
                <div className="flex flex-wrap md:flex-nowrap items-start justify-center md:justify-start w-full gap-y-3.5 sm:gap-y-4 md:gap-x-6">
                    <CardImage
                        id={id}
                        coverArtFileName={coverArtFileName}
                        originalLanguage={originalLanguage}
                        altTitles={altTitles}
                        englishTitle={englishTitle}
                        japaneseTitle={japaneseTitle}
                        className="w-40 xs:w-44 sm:w-48 md:w-56"
                    />

                    <div className="flex flex-col items-start w-full md:w-[calc(100%-14rem-1.5rem)]">
                        <CardTitle
                            id={id}
                            originalLanguage={originalLanguage}
                            altTitles={altTitles}
                            englishTitle={englishTitle}
                            japaneseTitle={japaneseTitle}
                            titleClassName="font-semibold"
                        />

                        <div className="flex items-center gap-x-2 mt-0.5 sm:mt-1 md:mt-0.5">
                            <CardOriginalLanguage originalLanguage={originalLanguage} />
                            <CardStatistics id={id} />
                        </div>

                        <CardLastUpdate updatedAt={updatedAt} />

                        <div className="flex flex-col w-full gap-y-1.5 mt-2.5 sm:mt-3 md:mt-4">
                            <Author relationships={relationships} />
                            <Artist relationships={relationships} />
                            <Genres tags={tags} />
                            <Themes tags={tags} />
                            <Format tags={tags} />
                        </div>
                    </div>
                </div>

                <CardDescription description={description} className="mt-3.5 sm:mt-4 md:mt-6 [&>*]:text-sm [&>hr]:my-4" />

                {/* Spacer */}
                <div className="py-3" />

                <Suspense
                    fallback={
                        <div className="flex items-center gap-x-2 text-orange-600 text-sm font-medium">
                            <Loader2 size={16} className="animate-spin" />
                            Loading Chapters...
                        </div>
                    }
                >
                    <Chapters id={id} />
                </Suspense>

                {/* Spacer */}
                <div className="pb-10" />
            </div>
        </MainLayout>
    );
}
