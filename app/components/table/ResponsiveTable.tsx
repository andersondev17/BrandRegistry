import { Brand } from "@/lib/types/types";
import { motion } from "framer-motion";
import { StatusBadge } from "../ui/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { BrandActions } from "./BrandActions";
import { TableWrapper } from "./TableWrapper";
export const ResponsiveTable = ({ brands }: { brands: Brand[] }) => {
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