"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { useBrands } from "@/context/BrandContext";
import type { Brand } from "@/lib/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { StatusBadge } from "../ui/StatusBadge";
import { BrandActions } from "./BrandActions";
import { TableWrapper } from "./TableWrapper";

const animations = {
    container: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1 }
        }
    },
    item: {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    }
};

// Añadimos TableTitle que faltaba
const TableTitle = () => (
    <motion.h2
        className="text-3xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        Registro de Marcas
    </motion.h2>
);

// Añadimos CreateBrandButton que faltaba
const CreateBrandButton = () => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
            asChild
            className="bg-gradient-to-r from-red-600 to-purple-600 hover:opacity-90 transition-all duration-300"
        >
            <Link href="/registro-marca/crear" className="flex items-center gap-2" aria-label="Nuevo Registro">
                <PlusCircle className="h-5 w-5" />
                <span>Nuevo Registro</span>
            </Link>
        </Button>
    </motion.div>
);



const ResponsiveTable = ({ brands }: { brands: Brand[] }) => {
    // Para mobile, transformamos la tabla en una lista de cards
    const isMobile = window.innerWidth < 768;

    return isMobile ? (
        <div className="grid grid-cols-1 gap-4 px-4">
            {brands.map((brand) => (
                <motion.div
                    key={brand.id}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 
                    shadow-sm border border-gray-100 dark:border-gray-700"
                    whileHover={{ y: -2 }}
                    layout
                >
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-medium text-lg">{brand.name}</h3>
                            <p className="text-sm text-gray-500">{brand.owner}</p>
                        </div>
                        <StatusBadge status={brand.status} />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <BrandActions brand={brand} />
                    </div>
                </motion.div>
            ))}
        </div>
    ) : (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Marca</TableHead>
                        <TableHead>Titular</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {brands.map((brand) => (
                        <TableRow
                            key={brand.id}
                            className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 
                                     transition-colors duration-200"
                        >
                            <TableCell className="font-medium">{brand.id || "-"}</TableCell>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-gradient-to-r 
                                                from-red-600 to-purple-600" />
                                    {brand.name}
                                </div>
                            </TableCell>
                            <TableCell>{brand.owner}</TableCell>
                            <TableCell>
                                <StatusBadge status={brand.status} />
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <BrandActions brand={brand} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    );
};

// Componente principal mejorado
export function BrandTable() {
    const { brands } = useBrands();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            className="w-full space-y-4 p-4 md:p-6 rounded-xl backdrop-blur-sm 
                      bg-white/30 dark:bg-black/30"
            initial="hidden"
            animate="visible"
            variants={animations.container}
        >
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <TableTitle />

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 
                                       text-gray-400 pointer-events-none" />
                        <Input
                            type="search"
                            placeholder="Buscar marca..."
                            className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 
                                   dark:border-gray-700 focus:ring-2 ring-red-500/20"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <CreateBrandButton />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {filteredBrands.length > 0 ? (
                    <ResponsiveTable brands={filteredBrands} />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center py-12 text-gray-500"
                    >
                        No se encontraron registros
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}