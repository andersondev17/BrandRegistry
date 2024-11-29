import { z } from "zod";

export const brandSchema = z.object({
    name: z.string()
        .min(2, {
            message: "Por favor, ingrese un nombre de marca válido (mínimo 2 caracteres)."
        })
        .max(50, {
            message: "El nombre de la marca no puede exceder los 50 caracteres."
        })
        .refine((val) => /^[a-zA-Z0-9\s-]+$/.test(val), {
            message: "El nombre solo puede contener letras, números, espacios y guiones."
        }),
    ownerContact: z.object({
        email: z.string().email({
            message: "Por favor, ingrese un correo electrónico válido."
        }),
        phone: z.string().regex(
            /^[+]?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4}$/,
            {
                message: "Por favor, ingrese un número de teléfono válido."
            }
        )
    }).optional()
});