import Link from 'next/link';
import Image from 'next/image';

export default function MainFooter() {
    return (
        <footer className="border-t">
            <div className="flex flex-col items-center gap-y-5 pt-12 pr-5 pb-20 pl-5">
                <p className="font-medium text-[0.6875rem] xs:text-[0.8125rem] text-center">&copy; Copyright 2025. Designed and built by jbmagx.</p>
                <div className="flex justify-center gap-8 p-0">
                    <Link href="https://www.linkedin.com/in/jbmags/" target="_blank">
                        <Image src="/linkedin.svg" alt="Linkedin logo" width={36} height={36} />
                    </Link>

                    <Link href="https://github.com/jbmags-codes" target="_blank">
                        <Image className="dark:invert" src="/github.svg" alt="GitHub logo" width={36} height={36} />
                    </Link>

                    <Link href="mailto:jbmags.codes@gmail.com" target="_blank">
                        <Image src="/gmail.svg" alt="Gmail logo" width={36} height={36} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
