// src/data/brands.ts
export const initialBrands = [
    {
        id: '1',
        name: 'Nike',
        owner: 'Nike Inc.',
        status: 'approved',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
    },
    {
        id: '2',
        name: 'Adidas',
        owner: 'Adidas AG',
        status: 'pending',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02')
    }
] as const;