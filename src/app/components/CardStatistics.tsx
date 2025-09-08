'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bookmark, Star, RotateCw } from 'lucide-react';
import { Button } from '@/components/custom/Button';
import { Skeleton } from '@/components/ui/skeleton';

type CardStatisticsProps = {
    id: string;
};

export default function CardStatistics({ id }: CardStatisticsProps) {
    const [bayesianRating, setBayesianRating] = useState<number | undefined>(undefined);
    const [follows, setFollows] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const getStatistics = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const userAgent = navigator.userAgent;

            const response = await fetch(`https://api.mangadex.org/statistics/manga/${id}`, {
                method: 'GET',
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to fetch data.');

            const mangaDexStatisticsResponse: MangaDexGetStatisticsMangaUUIDResponse = await response.json();
            const statistics = mangaDexStatisticsResponse.statistics;
            const bayesianRating = Object.values(statistics)[0].rating.bayesian;
            const follows = Object.values(statistics)[0].follows;

            setBayesianRating(bayesianRating);
            setFollows(follows);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getStatistics();
    }, [getStatistics]);

    if (isLoading)
        return (
            <>
                <Skeleton className="w-15 h-5 rounded-sm" />
                <Skeleton className="w-15 h-5 rounded-sm" />
            </>
        );

    return isError ? (
        <div className="flex items-center gap-x-0.5">
            <p className="font-semibold text-xs text-red-600">Failed to load.</p>
            <Button variant="light" color="danger" className="h-5 px-1.25 w-fit min-w-10 gap-x-1 rounded-[0.3125rem]" onClick={getStatistics}>
                <span className="font-semibold text-xs">Retry</span>
                <RotateCw size={13} strokeWidth={2.5} />
            </Button>
        </div>
    ) : (
        <>
            {bayesianRating && (
                <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-3 xs:[&>svg]:size-4">
                    <Star />
                    <span className="font-medium text-xs xs:text-sm">{bayesianRating.toFixed(2)}</span>
                </div>
            )}

            {follows && (
                <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-3 xs:[&>svg]:size-4">
                    <Bookmark />
                    <span className="font-medium text-xs xs:text-sm">{follows > 9999 ? `${(follows / 1000).toFixed(1)}K` : follows}</span>
                </div>
            )}
        </>
    );
}
