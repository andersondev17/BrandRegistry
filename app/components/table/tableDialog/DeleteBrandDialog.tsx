import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { useBrands } from "@/context/BrandContext";
import { Trash2 } from "lucide-react";

interface DeleteBrandDialogProps {
    readonly brandId: string;
}

export function DeleteBrandDialog({ brandId }: DeleteBrandDialogProps) {
    const { deleteBrand } = useBrands();

    return (
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
                    <AlertDialogCancel className="w-32 group relative overflow-hidden">
                        <span className="relative z-10">Cancelar</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => deleteBrand(brandId)}
                        className="w-32 bg-gradient-to-r from-red-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                    >
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}