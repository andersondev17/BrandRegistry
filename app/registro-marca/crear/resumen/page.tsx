"use client";
import { StepIndicator } from "@/app/components/StepIndicator";
import { Button } from "@/app/components/ui/button";
import { useBrands } from "@/context/BrandContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateBrandSummary() {
    const router = useRouter();
    const { addBrand } = useBrands();
    const [brandData, setBrandData] = useState<any>(null);

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("brandRegistration") || "{}");
        if (!data.name || !data.owner) {
            router.push("/registro-marca/crear");
        }
        setBrandData(data);
    }, [router]);

    const handleSubmit = () => {
        addBrand(brandData);
        sessionStorage.removeItem("brandRegistration");
        router.push("/");
    };

    if (!brandData) return null;

    return (
        <div>
            <StepIndicator currentStep={3} />
            <div className="max-w-xl mx-auto">
                <h2 className="text-lg font-medium mb-4 italic">Resumen del Registro</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Marca</h3>
                        <p className="text-lg">{brandData.name}</p>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Titular</h3>
                        <p className="text-lg">{brandData.owner}</p>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Contacto</h3>
                        <p>{brandData.ownerContact.email}</p>
                        <p>{brandData.ownerContact.phone}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-8">
                    <Button 
                        variant="ghost"
                        onClick={() => router.back()}
                    >
                        Atrás
                    </Button>
                    <Button 
                        onClick={handleSubmit}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Confirmar Registro
                    </Button>
                </div>
            </div>
        </div>
    );
}