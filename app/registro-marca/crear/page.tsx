"use client";

import { StepIndicator } from "@/app/components/StepIndicator";
import { useBrands } from "@/context/BrandContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateBrandStep1() {
    const router = useRouter();
    const [brandName, setBrandName] = useState("");
    const { addBrand } = useBrands();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!brandName.trim()) return;

        try {
            // Guardar en sessionStorage
            sessionStorage.setItem("brandRegistration", JSON.stringify({ 
                name: brandName,
                status: 'pending' 
            }));
            
            // Redirección correcta
            router.push("/registro-marca/crear/titular");
        } catch (error) {
            console.error("Error en el proceso:", error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    return (
        <div>
            <StepIndicator currentStep={1} />
            <div className="max-w-xl mx-auto">
                <h2 className="text-lg font-medium mb-4 italic">Información de la Marca</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="brandName" className="block mb-2">
                            Marca a Registrar
                        </label>
                        <input
                            type="text"
                            id="brandName"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            Atrás
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Continuar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}