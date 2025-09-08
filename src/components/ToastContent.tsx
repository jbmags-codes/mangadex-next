import { ReactNode } from 'react';

interface ToastContentProps {
    icon: ReactNode;
    message: string;
}

export function ToastContent({ icon, message }: ToastContentProps) {
    return (
        <div className="flex items-center w-80 gap-x-2.5 text-white font-medium">
            {icon}
            <span className="w-[calc(100%-1.125rem-0.625rem)] font-semibold text-white">{message}</span>
        </div>
    );
}
