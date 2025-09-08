import MainLayout from './components/MainLayout';
import Featured from './components/Featured';
import Completed from './components/Completed';
import LatestUpdates from './components/LatestUpdates';
import RecentlyAdded from './components/RecentlyAdded';

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
