export const FormSkeleton = () => {
    return (
        <div className="max-w-xl mx-auto p-4 sm:p-8 pt-16 space-y-6 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4" />
            {[1, 2, 3, 4].map((i) => (
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
    );
};