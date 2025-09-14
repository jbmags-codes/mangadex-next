import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function useSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchKeywords, setSearchKeywords] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        const query = searchParams.get('q');
        setSearchKeywords(query ?? '');
        setIsSearching(false);
    }, [searchParams]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSearching(true);

        router.push(searchKeywords === '' ? '/' : `/search?q=${searchKeywords}&page=1`, { scroll: false });
    };

    return {
        searchKeywords,
        setSearchKeywords,
        handleSubmit,
        isSearching,
    };
}
