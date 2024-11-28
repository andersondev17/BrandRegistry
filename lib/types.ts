// src/lib/types/brand.ts
export type Brand = {
    id: string;
    name: string;
    owner: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    ownerContact?: {
        email: string;
        phone: string;
    };
};

export type BrandStatus = 'pending' | 'approved' | 'rejected';

export interface BrandFormData {
    name: string;
    owner: string;
}