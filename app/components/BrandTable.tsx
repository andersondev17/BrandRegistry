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
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";

export function BrandTable() {
    const { brands, deleteBrand } = useBrands();

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold tracking-tight">Registros de Marca</h2>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link href="/registro-marca/crear">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Registro
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
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
                                            brand.status === 'approved' ? 'secondary' :
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
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => deleteBrand(brand.id)}
                                                        className="bg-red-600 hover:bg-red-700"
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
        </div>
    );
}