// components/StatusBadge.tsx
import type { BrandStatus } from "@/lib/types/types";
import type { StatusConfig } from "@/lib/types/ui";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export const statusConfig: StatusConfig = {
    approved: {
        variant: "default",
        text: "Aprobado",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
    },
    pending: {
        variant: "secondary",
        text: "Pendiente",
        className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
    },
    rejected: {
        variant: "destructive",
        text: "Rechazado",
        className: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800"
    }
};

export const StatusBadge = ({ status }: { status: BrandStatus }) => {
    const config = statusConfig[status];
    return (
        <Badge
            variant={config.variant}
            className={cn("transition-all duration-200", config.className)}
        >
            {config.text}
        </Badge>
    );
};