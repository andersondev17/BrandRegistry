"use client";
import { initialBrands } from '@/data/brands';
import { Brand, BrandFormData } from '@/lib/types/types';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'brandRegistry';

interface BrandContextType {
    brands: Brand[];
    addBrand: (data: BrandFormData) => void;
    updateBrand: (id: string, data: Partial<Brand>) => void;
    deleteBrand: (id: string) => void;
    getBrandById: (id: string) => Brand | undefined;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar datos y establecer el siguiente ID
    useEffect(() => {
        const loadBrands = async () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsedBrands = JSON.parse(stored);
                    // Convertir strings de fecha a objetos Date
                    const brandsWithDates = parsedBrands.map((brand: any) => ({
                        ...brand,
                        createdAt: new Date(brand.createdAt),
                        updatedAt: new Date(brand.updatedAt)
                    }));
                    setBrands(brandsWithDates);
                } else {
                    setBrands([...initialBrands]);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBrands));
                }
            } catch (error) {
                console.error('Error loading brands:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadBrands();
    }, []);

    // Persistir cambios
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
        }
    }, [brands, isLoading]);

    const getNextId = (currentBrands: Brand[]): string => {
        const maxId = currentBrands.reduce((max, brand) => {
            const currentId = parseInt(brand.id);
            return currentId > max ? currentId : max;
        }, 0);
        return (maxId + 1).toString();
    };

    const addBrand = (data: BrandFormData) => {
        setBrands(prev => {
            const newBrand: Brand = {
                id: getNextId(prev),
                ...data,
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            return [...prev, newBrand];
        });
    };

    const updateBrand = (id: string, data: Partial<Brand>) => {
        setBrands(prev => prev.map(brand =>
            brand.id === id
                ? { ...brand, ...data, updatedAt: new Date() }
                : brand
        ));
    };

    const deleteBrand = (id: string) => {
        setBrands(prev => prev.filter(brand => brand.id !== id));
    };

    const getBrandById = (id: string) => {
        return brands.find(brand => brand.id === id);
    };

    const value = useMemo(() => ({
        brands,
        addBrand,
        updateBrand,
        deleteBrand,
        getBrandById
    }), [brands]);

    return (
        <BrandContext.Provider value={value}>
            {children}
        </BrandContext.Provider>
    );
}

export function useBrands() {
    const context = useContext(BrandContext);
    if (!context) {
        throw new Error('useBrands must be used within a BrandProvider');
    }
    return context;
}