import CardImage from '@/app/components/CardImage';
import CardTitle from '@/app/components/CardTitle';
import CardOriginalLanguage from '@/app/components/CardOriginalLanguage';
import CardStatistics from '@/app/components/CardStatistics';
import CardGenresOrThemes from '@/app/components/CardGenresOrThemes';
import CardDescription from '@/app/components/CardDescription';

type CompletedResultsProps = {
    completedResults: MangaDexGetMangaResponse;
};

export default function CompletedResults({ completedResults }: CompletedResultsProps) {
    return (
        completedResults && (
            <div className="flex flex-col w-full gap-y-4 md:gap-y-6">
                {completedResults.data.length > 0 ? (
                    completedResults.data.map((mangaDexGetMangaDataItem, index) => {
                        const id = mangaDexGetMangaDataItem.id;
                        const coverArtFileName = mangaDexGetMangaDataItem?.relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName as
                            | string
                            | undefined;
                        const originalLanguage = mangaDexGetMangaDataItem.attributes.originalLanguage;
                        const altTitles = mangaDexGetMangaDataItem.attributes.altTitles;
                        const englishTitle = mangaDexGetMangaDataItem.attributes.title.en;
                        const japaneseTitle = mangaDexGetMangaDataItem.attributes.title.ja;
                        const tags = mangaDexGetMangaDataItem?.attributes?.tags;
                        const description = mangaDexGetMangaDataItem?.attributes?.description?.en;

                        return (
                            <div key={index} className="flex items-start w-full gap-x-4 md:gap-x-6">
                                <CardImage
                                    id={id}
                                    coverArtFileName={coverArtFileName}
                                    originalLanguage={originalLanguage}
                                    altTitles={altTitles}
                                    englishTitle={englishTitle}
                                    japaneseTitle={japaneseTitle}
                                    withStatus={false}
                                    className="w-24 xs:w-28 sm:w-32 md:w-56"
                                />

                                <div className="flex flex-col w-[calc(100%-6rem-1rem)] xs:w-[calc(100%-7rem-1rem)] sm:w-[calc(100%-8rem-1rem)] md:w-[calc(100%-14rem-1.5rem)]">
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

                                    <CardGenresOrThemes tags={tags} />

                                    <CardDescription description={description} className="line-clamp-4 md:line-clamp-[7] mt-2 md:mt-2.5 [&>*]:text-xs sm:[&>*]:text-sm" />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center w-full my-20">
                        <p className="text-medium text-muted-foreground">No results found.</p>
                    </div>
                )}
            </div>
        )
    );
}
