import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function capitalize(str: string) {
    const lowerCaseStr = str.toLowerCase();
    return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
}

export const formatDate = (dateString: string, Options: Intl.DateTimeFormatOptions) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = Options;
    return date.toLocaleString('en-US', options).replace(' at ', ' ');
};
