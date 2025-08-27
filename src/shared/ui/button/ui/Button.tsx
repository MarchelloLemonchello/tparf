// src/shared/ui/button/ui/Button.tsx
'use client';
import { forwardRef } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant='primary', size='md', loading=false, fullWidth=false, className, children, disabled, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={clsx(
                    'inline-flex items-center justify-center rounded-md transition',
                    fullWidth && 'w-full',
                    {
                        primary: 'bg-blue-600 text-white hover:bg-blue-700',
                        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
                        ghost: 'bg-transparent hover:bg-gray-50',
                        link: 'bg-transparent text-blue-600 hover:underline',
                    }[variant],
                    {
                        sm: 'h-8 px-3 text-sm',
                        md: 'h-10 px-4 text-sm',
                        lg: 'h-12 px-6 text-base',
                    }[size],
                    (disabled || loading) && 'opacity-60 cursor-not-allowed',
                    className
                )}
                {...rest}
            >
                {loading && <span className="mr-2 animate-spin">⏳</span>}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';
