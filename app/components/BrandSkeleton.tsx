import { memo } from 'react';

export const BrandFormSkeleton = memo(() => (
    <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4" />

        {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </div>
        ))}

        <div className="flex justify-between pt-6">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md" />
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
    </div>
));

BrandFormSkeleton.displayName = 'BrandFormSkeleton';