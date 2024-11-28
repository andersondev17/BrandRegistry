"use client";
import { Button } from "@/app/components/ui/button";
import { useBrands } from "@/context/BrandContext";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PageParams = {
    params: {
        id: string;
    };
}
const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};
export default function EditBrand(props: PageParams) {
    const { id } = props.params;
    const { getBrandById, updateBrand } = useBrands();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        owner: "",
        ownerContact: {
            email: "",
            phone: ""
        }
    });

    useEffect(() => {
        const brand = getBrandById(id);
        if (!brand) {
            router.push("/");
            return;
        }
        setFormData({
            name: brand.name,
            owner: brand.owner,
            ownerContact: brand.ownerContact || { email: "", phone: "" }
        });
    }, [id, getBrandById, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateBrand(props.params.id, formData);
        router.push("/");
    };

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto p-8 pt-16 bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10"
        >
            <div className="max-w-xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="w-6 h-6 text-purple animate-pulse" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple to-blue-500 bg-clip-text ">
                        Editar Registro de Marca
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div

                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="group"
                    >
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200 group-focus-within:text-purple">
                            Marca
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </motion.div>

                    <div>
                        <label htmlFor="owner" className="block text-sm font-medium mb-2 text-gray-200 group-focus-within:text-purple">
                            Titular
                        </label>
                        <input
                            type="text"
                            id="owner"
                            value={formData.owner}
                            onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200 group-focus-within:text-purple">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.ownerContact.email}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                ownerContact: { ...prev.ownerContact, email: e.target.value }
                            }))}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-200 group-focus-within:text-purple">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.ownerContact.phone}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                ownerContact: { ...prev.ownerContact, phone: e.target.value }
                            }))}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <motion.div
                        className="flex justify-between mt-12"
                        variants={itemVariants}
                    >                  
                  <Button
                        type="button"
                        variant="outline"
                        className="w-32 group relative overflow-hidden"
                        onClick={() => router.push("/")}
                    >
                            <span className="relative z-10">Cancelar</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                        </Button>
                        <Button
                            type="submit"
                            className="w-32 bg-gradient-to-r from-red-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                        >
                            Guardar Cambios
                        </Button>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    );
}