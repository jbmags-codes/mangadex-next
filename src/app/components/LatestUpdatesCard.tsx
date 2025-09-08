import CardImage from '@/app/components/CardImage';
import CardTitle from '@/app/components/CardTitle';
import CardOriginalLanguage from '@/app/components/CardOriginalLanguage';
import CardStatistics from '@/app/components/CardStatistics';
import CardLastUpdate from '@/app/components/CardLastUpdate';
import CardDescription from '@/app/components/CardDescription';

type LatestUpdatesCardProps = {
    mangaDexGetMangaDataItem: MangaDexGetMangaDataItem;
};

export default function LatestUpdatesCard({ mangaDexGetMangaDataItem }: LatestUpdatesCardProps) {
    const id = mangaDexGetMangaDataItem.id;
    const coverArtFileName = mangaDexGetMangaDataItem?.relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName as string | undefined;
    const originalLanguage = mangaDexGetMangaDataItem.attributes.originalLanguage;
    const altTitles = mangaDexGetMangaDataItem.attributes.altTitles;
    const englishTitle = mangaDexGetMangaDataItem.attributes.title.en;
    const japaneseTitle = mangaDexGetMangaDataItem.attributes.title.ja;
    const status = mangaDexGetMangaDataItem.attributes.status;
    const updatedAt = mangaDexGetMangaDataItem.attributes.updatedAt;
    const description = mangaDexGetMangaDataItem?.attributes?.description?.en;

    return (
        <div className="flex items-start w-full md:w-[calc(50%-0.5rem)] gap-x-3.5 xs:gap-x-4">
            <CardImage
                id={id}
                coverArtFileName={coverArtFileName}
                originalLanguage={originalLanguage}
                altTitles={altTitles}
                englishTitle={englishTitle}
                japaneseTitle={japaneseTitle}
                status={status}
                className="w-24 xs:w-28 sm:w-32"
            />

            <div className="flex flex-col w-[calc(100%-6rem-0.875rem)] xs:w-[calc(100%-7rem-1rem)] sm:w-[calc(100%-8rem-1rem)]">
                <CardTitle
                    id={id}
                    originalLanguage={originalLanguage}
                    altTitles={altTitles}
                    englishTitle={englishTitle}
                    japaneseTitle={japaneseTitle}
                    titleClassName="font-medium text-sm sm:text-[0.9375rem] line-clamp-1 xs:line-clamp-2"
                />

                <div className="flex items-center gap-x-2 mt-0.5 sm:mt-1 md:mt-0.5 min-h-5">
                    <CardOriginalLanguage originalLanguage={originalLanguage} />
                    <CardStatistics id={id} />
                </div>

                <CardLastUpdate updatedAt={updatedAt} />

                <CardDescription description={description} className="line-clamp-4 mt-2 md:mt-2.5 [&>*]:text-xs sm:[&>*]:text-sm" />
            </div>
        </div>
    );
}
