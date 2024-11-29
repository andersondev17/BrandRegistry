export const initialBrands = [
    {
        id: '1',
        name: 'Nike',
        owner: 'Nike Inc.',
        status: 'approved' as const,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        ownerContact: {
            email: 'contact@nike.com',
            phone: '+1 234-567-8900'
        }
    },
    {
        id: '2',
        name: 'Adidas',
        owner: 'Adidas AG',
        status: 'pending' as const,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
        ownerContact: {
            email: 'contact@adidas.com',
            phone: '+1 234-567-8901'
        }
    },
    {
        id: '3',
        name: 'Puma',
        owner: 'Puma Inc.',
        status: 'rejected' as const,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03'),
        ownerContact: {
            email: 'contact@puma.com',
            phone: '+1 234-567-8902'
        }
    }
];