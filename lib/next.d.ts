// app/types/next.d.ts
import type { ReactNode } from 'react';

declare module 'next' {
    export interface PageProps {
        params: Promise<{ [key: string]: string }>;
        searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
        children?: ReactNode;
    }
}