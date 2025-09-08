import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center w-full h-[100svh] sm:h-[100dvh] px-4">
            <div className="flex flex-col items-center justify-center w-full max-w-sm gap-y-4 h-[100svh] sm:h-[100dvh]">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="font-bold text-5xl xs:text-6xl sm:text-7xl mt-3 mb-3 text-rose-500">404</h1>
                    <p className="font-semibold text-lg xs:text-xl sm:text-2xl text-center mb-3 xs:mb-4 sm:mb-6">Oop! Page not found.</p>
                    <Link
                        href="/"
                        className="flex items-center justify-center h-10 px-6 bg-blue-600 text-white rounded-full shadow-sm font-medium mb-5 text-sm hover:opacity-80 duration-300"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
