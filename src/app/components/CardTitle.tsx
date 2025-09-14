import Link from 'next/link';
import { cn } from '@/lib/utils';

type CardTitleProps = {
    id: string;
    originalLanguage: string;
    altTitles: Record<string, string>[];
    englishTitle: string;
    japaneseTitle: string;
    linkClassName?: string;
    titleClassName?: string;
};

export default function CardTitle({ id, originalLanguage, altTitles, englishTitle, japaneseTitle, linkClassName, titleClassName }: CardTitleProps) {
    const title =
        originalLanguage === 'ja' && altTitles.find((title) => title.hasOwnProperty('en'))?.en
            ? altTitles.find((title) => title.hasOwnProperty('en'))?.en
            : englishTitle || japaneseTitle;

    return (
        <Link href={`/manga/${id}`} className={cn('hover:text-orange-600 duration-300 w-fit', linkClassName)}>
            <h1 className={cn(titleClassName)}>{title}</h1>
        </Link>
    );
}
