import { TableCell, TableRow } from "@/app/components/ui/table";

const TableRowSkeleton = () => {
    return (
        <TableRow className="animate-pulse">
            <TableCell className="w-[100px]">
                <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
            </TableCell>
            <TableCell>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </TableCell>
            <TableCell>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            </TableCell>
            <TableCell>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default TableRowSkeleton;