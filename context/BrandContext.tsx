"use client";
import { initialBrands } from '@/data/brands';
import { Brand, BrandFormData } from '@/lib/types';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

// Storage key constant
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
    const [brands, setBrands] = useState<Brand[]>([...initialBrands]);
    const [isLoading, setIsLoading] = useState(true);

    // load from local storage
    useEffect(() => {
        const loadBrands = async () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsedBrands = JSON.parse(stored);
                    // Convert string dates back to Date objects
                    const brandsWithDates = parsedBrands.map((brand: any) => ({
                        ...brand,
                        createdAt: new Date(brand.createdAt),
                        updatedAt: new Date(brand.updatedAt)
                    }));
                    setBrands(brandsWithDates);
                } else {
                    // Import initial data dynamically to avoid SSR issues
                    const { initialBrands } = await import('@/data/brands');
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

    // Save to localStorage whenever brands change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
        }
    }, [brands, isLoading]);

    const addBrand = (data: BrandFormData) => {
        const newBrand: Brand = {
            id: crypto.randomUUID(),
            ...data,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        setBrands(prev => [...prev, newBrand]);
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

    return (
        <BrandContext.Provider value={useMemo(() => ({
            brands,
            addBrand,
            updateBrand,
            deleteBrand,
            getBrandById
        }), [brands, addBrand, updateBrand, deleteBrand, getBrandById])}>
            {children}
        </BrandContext.Provider>
    );
}

export function useBrands() {
    const context = useContext(BrandContext);
    if (context === undefined) {
        throw new Error('useBrands must be used within a BrandProvider');
    }
    return context;
}