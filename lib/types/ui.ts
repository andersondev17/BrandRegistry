import { BrandStatus } from "./types";

// app/types/ui.ts
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeConfig {
    variant: BadgeVariant;
    text: string;
    className: string;
}

export type StatusConfig = Record<BrandStatus, BadgeConfig>;