import React from 'react';
import { cn } from './Button';

const Avatar = ({ src, fallback, size = 'md', className, status }) => {
    const sizes = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-14 w-14 text-base',
        xl: 'h-20 w-20 text-xl',
    };

    return (
        <div className={cn('relative inline-flex shrink-0', className)}>
            <div className={cn(
                'flex items-center justify-center rounded-full bg-secondary overflow-hidden',
                sizes[size]
            )}>
                {src ? (
                    <img src={src} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                    <span className="font-medium uppercase text-muted-foreground">{fallback}</span>
                )}
            </div>
            {status && (
                <span className={cn(
                    "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                    status === 'online' ? "bg-green-500" : "bg-gray-500"
                )} />
            )}
        </div>
    );
};

export { Avatar };
