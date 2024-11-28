"use client";
import { StepIndicator } from "@/app/components/StepIndicator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateBrandStep2() {
    const router = useRouter();
    const [ownerData, setOwnerData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("brandRegistration") || "{}");
        if (!data.name) {
            router.push("/registro-marca/crear");
        }
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const brandData = JSON.parse(sessionStorage.getItem("brandRegistration") || "{}");
        sessionStorage.setItem("brandRegistration", JSON.stringify({
            ...brandData,
            owner: ownerData.name,
            ownerContact: {
                email: ownerData.email,
                phone: ownerData.phone
            }
        }));
        router.push("/registro-marca/crear/resumen");
    };

    return (
        <div>
            <StepIndicator currentStep={2} />
            <div className="max-w-xl mx-auto">
                <h2 className="text-lg font-medium mb-4 italic">Información del Titular</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="ownerName" className="block mb-2">
                                Nombre del Titular
                            </label>
                            <input
                                type="text"
                                id="ownerName"
                                value={ownerData.name}
                                onChange={(e) => setOwnerData(prev => ({...prev, name: e.target.value}))}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="ownerEmail" className="block mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="ownerEmail"
                                value={ownerData.email}
                                onChange={(e) => setOwnerData(prev => ({...prev, email: e.target.value}))}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="ownerPhone" className="block mb-2">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                id="ownerPhone"
                                value={ownerData.phone}
                                onChange={(e) => setOwnerData(prev => ({...prev, phone: e.target.value}))}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={() => router.back()}
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