export interface Brand {
    id: string;
    name: string;
    owner: string;
    status: BrandStatus;
    createdAt: Date;
    updatedAt: Date;
    ownerContact?: {
        email: string;
        phone: string;
    };
}

export type BrandStatus = 'pending' | 'approved' | 'rejected';

export interface BrandFormData {
    name: string;
    owner: string;
    ownerContact?: {
        email: string;
        phone: string;
    };
}