import MainLayout from '@/app/components/MainLayout';
import Featured from '@/app/components/Featured';
import Completed from '@/app/components/Completed';
import LatestUpdates from '@/app/components/LatestUpdates';
import RecentlyAdded from '@/app/components/RecentlyAdded';

export default function Home() {
    return (
        <MainLayout>
            <Featured />

            {/* Spacer */}
            <div className="py-4" />

            <Completed />

            {/* Spacer */}
            <div className="py-4" />

            <LatestUpdates />

            {/* Spacer */}
            <div className="py-5" />

            <RecentlyAdded />

            {/* Spacer */}
            <div className="pb-10" />
        </MainLayout>
    );
}
