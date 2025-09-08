import { languages } from '@/app/constants/languages';

type CardOriginalLanguageProps = {
    originalLanguage: string;
};

export default function CardOriginalLanguage({ originalLanguage }: CardOriginalLanguageProps) {
    return (
        languages.find((language) => language.code === originalLanguage) && (
            <span className="text-xl xs:text-2xl lg:text-3xl leading-[0] mr-0.5">{languages.find((language) => language.code === originalLanguage)?.flag}</span>
        )
    );
}
