import React from 'react';
import { cn } from '@/components/ui/Button';

const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted/50", className)}
            {...props}
        />
    );
};

const ChatSkeleton = () => {
    return (
        <div className="space-y-4 p-4 lg:p-6">
            <div className="flex justify-center mb-8">
                <Skeleton className="h-6 w-64 rounded-full" />
            </div>
            {[...Array(5)].map((_, i) => (
                <div key={i} className={cn("flex", i % 2 === 0 ? "justify-start" : "justify-end")}>
                    <div className="space-y-2 max-w-[70%]">
                        <Skeleton className={cn("h-10 w-48 md:w-64", i % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none")} />
                        <Skeleton className="h-3 w-16 float-right" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export { Skeleton, ChatSkeleton };
