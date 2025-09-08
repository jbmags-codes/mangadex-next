import Link from 'next/link';
import Image from 'next/image';

export default function Title() {
    return (
        <Link href={'/'} className="flex items-center justify-center gap-x-3">
            <span className="relative w-8 h-8">
                <Image
                    src={'/mangadex.svg'}
                    alt="MangaDex logo"
                    fill={true}
                    priority={true}
                    sizes="33vw"
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </span>
            <span className="font-semibold text-xl text-center -tracking-[0.015625rem] mr-3">MangaDex</span>
        </Link>
    );
}
