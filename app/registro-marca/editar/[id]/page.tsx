"use client";
import { Button } from "@/app/components/ui/button";
import { useBrands } from "@/context/BrandContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditBrand({ params }: { params: { id: string } }) {
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
        const brand = getBrandById(params.id);
        if (!brand) {
            router.push("/");
            return;
        }
        setFormData({
            name: brand.name,
            owner: brand.owner,
            ownerContact: brand.ownerContact || { email: "", phone: "" }
        });
    }, [params.id, getBrandById, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateBrand(params.id, formData);
        router.push("/");
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-lg font-medium mb-4">Editar Registro de Marca</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-2">
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
                </div>

                <div>
                    <label htmlFor="owner" className="block mb-2">
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
                    <label htmlFor="email" className="block mb-2">
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
                    <label htmlFor="phone" className="block mb-2">
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

                <div className="flex justify-between mt-8">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.push("/")}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </form>
        </div>
    );
}