"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { useBrands } from "@/context/BrandContext";
import { Brand, BrandStatus } from "@/lib/types";
import { motion } from "framer-motion";
import { Edit, PlusCircle } from "lucide-react";
import Link from "next/link";
import { DeleteBrandDialog } from "./tableDialog/DeleteBrandDialog";

/**
 * Configuración de las animaciones
 */
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

/**
 * Componentes internos para la tabla
 */
const TableTitle = () => (
    <motion.h2
        className="text-3xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        Registro de Marcas
    </motion.h2>
);

const CreateBrandButton = () => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
            asChild
            className="bg-gradient-to-r from-red-600 to-purple-600 hover:opacity-90 transition-all duration-300"
        >
            <Link href="/registro-marca/crear" className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Nuevo Registro
            </Link>
        </Button>
    </motion.div>
);

//Helper para obtener la variante del Badge según el estado
const getStatusBadgeVariant = (status: BrandStatus): "secondary" | "outline" | "destructive" => {
    const variants = {
        approved: 'secondary',
        pending: 'outline',
        rejected: 'destructive'
    } as const;
    
    return variants[status] || 'outline';
};
const getStatusText = (status: BrandStatus): string => {// Helper para obtener el texto de estado formateado
    const statusTexts = {
        approved: 'Aprobado',
        pending: 'Pendiente',
        rejected: 'Rechazado'
    };
    
    return statusTexts[status] || status;
};
//Componente para las acciones de cada marca
const BrandActions = ({ brand }: { brand: Brand }) => (
    <div className="flex justify-end gap-2">
        <DeleteBrandDialog brandId={brand.id} />
        <Button variant="ghost" size="icon" asChild>
            <Link href={`/registro-marca/editar/${brand.id}`}>
                <Edit className="h-4 w-4 text-green-500" />
            </Link>
        </Button>
    </div>
);

/**
 * BrandTable - Componente principal que muestra la tabla de marcas registradas
 * 
 * @component
 * @example
 * ```tsx
 * <BrandTable />
 * ```
 */
export function BrandTable() {
    const { brands } = useBrands();

    return (
        <motion.div
            className="w-full space-y-4 p-6 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30"
            initial="hidden"
            animate="visible"
            variants={animations.container}
        >
            <div className="flex justify-between items-center mb-8">
                <TableTitle />
                <CreateBrandButton />
            </div>

            <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-lg">
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
                            <TableRow key={brand.id}>
                                <TableCell className="font-medium">{brand.id || "-"}</TableCell>
                                <TableCell className="font-medium">{brand.name}</TableCell>
                                <TableCell>{brand.owner}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={getStatusBadgeVariant(brand.status)}
                                        className="transition-all duration-200"
                                    >
                                        {getStatusText(brand.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <BrandActions brand={brand} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
}