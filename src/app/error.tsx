'use client'; // Error boundaries must be Client Components

import Link from 'next/link';
import { useEffect } from 'react';
import { WarningIcon } from '../../public/warning-icon';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-[100svh] sm:h-[100dvh]">
            <div className="w-full max-w-70 xs:max-w-xs">
                <div className="flex-wrap p-5 pb-0">
                    <div className="flex justify-center w-full mb-3 dark:invert">
                        <WarningIcon height={100} width={100} />
                    </div>
                    <h1 className="w-full text-center font-bold text-3xl">Oops!</h1>
                </div>

                <div className="p-5 py-2">
                    <p className="w-full text-center font-medium">Something Went Wrong</p>
                </div>

                <div className="flex items-center justify-center gap-2 p-5 pt-2">
                    <Link
                        href="/"
                        className="flex items-center justify-center bg-green-500 w-[calc(100%-0.25rem)] h-10 px-4 rounded-full text-sm font-medium text-nowrap hover:opacity-80 duration-300"
                    >
                        Return Home
                    </Link>
                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center bg-primary w-[calc(100%-0.25rem)] h-10 px-4 rounded-full text-sm font-medium text-white text-nowrap hover:opacity-80 duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
