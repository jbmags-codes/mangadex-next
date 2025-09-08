import { cn } from '@/lib/utils'; // Utility to merge classNames
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    isLoading?: boolean;
    isIconOnly?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'solid', size = 'md', radius = 'md', color = 'default', isLoading, className, children, isIconOnly, ...props }, ref) => {
        const baseStyles = 'flex items-center justify-center gap-x-2 whitespace-nowrap overflow-hidden box-border select-none transition-all duration-300';

        const sizeStyles = {
            xs: 'px-3 min-w-16 h-7 text-xs',
            sm: 'px-3.5 min-w-16 h-9 text-sm',
            md: 'px-4 min-w-20 h-10 text-sm',
            lg: 'px-6 min-w-24 h-12 gap-x-3 text-md',
        };

        const radiusStyles = {
            none: '',
            sm: 'rounded-[0.5rem]',
            md: 'rounded-[0.75rem]',
            lg: 'rounded-[0.875rem]',
            full: 'rounded-full',
        };

        const variantStyles = {
            solid: {
                default: 'bg-primary hover:bg-primary/80 text-white disabled:hover:bg-primary disabled:hover:opacity-50',
                primary: 'bg-blue-600 hover:bg-blue-600/80 text-white disabled:hover:bg-blue-600 disabled:hover:opacity-50',
                secondary: 'bg-purple-600 hover:bg-purple-600/80 text-white disabled:hover:bg-purple-600 disabled:hover:opacity-50',
                success: 'bg-green-500 hover:bg-green-500/80 text-black disabled:hover:bg-green-500 disabled:hover:opacity-50',
                warning: 'bg-orange-400 hover:bg-orange-400/80 text-black disabled:hover:bg-orange-400 disabled:hover:opacity-50',
                danger: 'bg-red-600 hover:bg-red-600/80 text-white disabled:hover:bg-red-600 disabled:hover:opacity-50',
            },
            faded: {
                default: 'bg-gray-100 border-2 border-gray-300/90 hover:bg-gray-100/50 disabled:hover:bg-gray-100',
                primary: 'bg-gray-100 border-2 border-gray-300/90 hover:bg-gray-100/50 text-blue-600 disabled:hover:bg-gray-100',
                secondary: 'bg-gray-100 border-2 border-gray-300/90 hover:bg-gray-100/50 text-purple-600 disabled:hover:bg-gray-100',
                success: 'bg-gray-100 border-2 border-gray-300/90 hover:bg-gray-100/50 text-green-500 disabled:hover:bg-gray-100',
                warning: 'bg-gray-100 border-2 border-gray-300/90 hover:bg-gray-100/50 text-orange-400 disabled:hover:bg-gray-100',
                danger: 'bg-gray-100 border-2 border-gray-300/90 hover:bg-gray-100/50 text-red-600 disabled:hover:bg-gray-100',
            },
            bordered: {
                default: 'border-2 border-gray-300/90 hover:opacity-70 disabled:hover:opacity-50',
                primary: 'border-2 border-blue-600 hover:opacity-70 text-blue-600 disabled:hover:opacity-50',
                secondary: 'border-2 border-purple-600 hover:opacity-70 text-purple-600 disabled:hover:opacity-50',
                success: 'border-2 border-green-500 hover:opacity-70 text-green-500 disabled:hover:opacity-50',
                warning: 'border-2 border-orange-400 hover:opacity-70 text-orange-400 disabled:hover:opacity-50',
                danger: 'border-2 border-red-600 hover:opacity-70 text-red-600 disabled:hover:opacity-50',
            },
            light: {
                default: 'hover:bg-primary/20 disabled:hover:bg-transparent',
                primary: 'hover:bg-blue-600/20 text-blue-600 disabled:hover:bg-transparent',
                secondary: 'hover:bg-purple-600/20 text-purple-600 disabled:hover:bg-transparent',
                success: 'hover:bg-green-500/20 text-green-500 disabled:hover:bg-transparent',
                warning: 'hover:bg-orange-400/20 text-orange-400 disabled:hover:bg-transparent',
                danger: 'hover:bg-red-600/20 text-red-600 disabled:hover:bg-transparent',
            },
            flat: {
                default: 'bg-primary/20 hover:opacity-80 disabled:hover:bg-primary/20 disabled:hover:opacity-50',
                primary: 'bg-blue-600/20 hover:opacity-80 text-blue-600 disabled:hover:bg-blue-600/20 disabled:hover:opacity-50',
                secondary: 'bg-purple-600/20 hover:opacity-80 text-purple-600 disabled:hover:bg-purple-600/20 disabled:hover:opacity-50',
                success: 'bg-green-500/20 hover:opacity-80 text-green-500 disabled:hover:bg-green-500/20 disabled:hover:opacity-50',
                warning: 'bg-orange-400/20 hover:opacity-80 text-orange-400 disabled:hover:bg-orange-400/20 disabled:hover:opacity-50',
                danger: 'bg-red-600/20 hover:opacity-80 text-red-600 disabled:hover:bg-red-600/20 disabled:hover:opacity-50',
            },
            ghost: {
                default: 'border-2 border-primary hover:bg-primary hover:text-white disabled:hover:bg-transparent disabled:hover:text-black',
                primary: 'border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white disabled:hover:bg-transparent disabled:hover:text-blue-600',
                secondary: 'border-2 border-purple-600 hover:bg-purple-600 text-purple-600 hover:text-white disabled:hover:bg-transparent disabled:hover:text-purple-600',
                success: 'border-2 border-green-500 hover:bg-green-500 text-green-500 hover:text-black disabled:hover:bg-transparent disabled:hover:text-green-500',
                warning: 'border-2 border-orange-400 hover:bg-orange-400 text-orange-400 hover:text-black disabled:hover:bg-transparent disabled:hover:text-orange-400',
                danger: 'border-2 border-red-600 hover:bg-red-600 text-red-600 hover:text-white disabled:hover:bg-transparent disabled:hover:text-red-600',
            },
        };

        const isIconOnlyStyles = {
            xs: 'px-0 min-w-7 w-7 h-7',
            sm: 'px-0 min-w-8 w-8 h-8',
            md: 'px-0 min-w-10 w-10 h-10',
            lg: 'px-0 min-w-12 w-12 h-12',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, sizeStyles[size], radiusStyles[radius], variantStyles[variant][color], isIconOnly && isIconOnlyStyles[size], className, {
                    'opacity-50 cursor-not-allowed': props.disabled || isLoading,
                })}
                disabled={props.disabled || isLoading}
                {...props}
            >
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : null}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
