"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";
import { useBrands } from "@/context/BrandContext";
import { motion } from "framer-motion";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";

export function BrandTable() {
    const { brands, deleteBrand } = useBrands();
    const tableVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <motion.div
            className="w-full space-y-4 p-6 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30"
            initial="hidden"
            animate="visible"
            variants={tableVariants}
        >
            {/* Header mejorado */}
            <div className="flex justify-between items-center mb-8">
                <motion.h2
                    className="text-3xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Registro de Marcas
                </motion.h2>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button asChild className="bg-gradient-to-r from-red-600 to-purple-600 hover:opacity-90 transition-all duration-300">
                        <Link href="/registro-marca/crear" className="flex items-center gap-2">
                            <PlusCircle className="h-5 w-5" />
                            Nuevo Registro
                        </Link>
                    </Button>
                </motion.div>
            </div>

            <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-center"></TableHead>
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
                                        variant={
                                            brand.status === 'approved' ? 'outline' :
                                                brand.status === 'pending' ? 'outline' : 'destructive'
                                        }
                                    >
                                        {brand.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta acción no se puede deshacer. Esto eliminará permanentemente el registro de marca.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="w-32 group relative overflow-hidden display-inline-block">
                                                        <span className="relative z-10">Cancelar</span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => deleteBrand(brand.id)}
                                                        className="w-32 bg-gradient-to-r from-red-600 to-purple-600 text-white hover:opacity-90 transition-opacity"

                                                    >
                                                        Eliminar
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/registro-marca/editar/${brand.id}`}>
                                                <Edit className="h-4 w-4 text-green-500" />
                                            </Link>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
}