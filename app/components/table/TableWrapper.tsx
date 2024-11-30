export const TableWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-auto rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg
                    scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 
                    dark:scrollbar-thumb-gray-800">
        {children}
    </div>
);