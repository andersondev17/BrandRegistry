import { Brand } from "@/lib/types/types";
import { Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { DeleteBrandDialog } from "./tableDialog/DeleteBrandDialog";

export const BrandActions = ({ brand }: { brand: Brand }) => (
    <div className="flex justify-end gap-2">
        <DeleteBrandDialog brandId={brand.id} />
        <Button variant="ghost" size="icon" asChild>
            <Link href={`/registro-marca/editar/${brand.id}`} aria-label="Editar marca">
                <Edit className="h-4 w-4 text-green-500" />
            </Link>
        </Button>
    </div>
);