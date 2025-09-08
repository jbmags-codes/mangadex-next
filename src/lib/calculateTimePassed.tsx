export function calculateTimePassed(date: Date | string): string {
    const now = new Date();
    const pastDate = new Date(date);
    const diff = now.getTime() - pastDate.getTime();

    if (isNaN(pastDate.getTime())) {
        return 'Invalid date';
    }

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
}
