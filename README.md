# 🎯 Sistema de Registro de Marcas 

A modern, efficient brand registration management system built with Next.js 15 and TypeScript. This application provides a complete CRUD interface for managing brand registrations with a sleek, user-friendly design.

<div align="center">

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

## 📋 Contenido
- [Demo](#-demo)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Autor](#-autor)

## 🚀 Demo

- **Live Demo**: [Brand Registry System](https://brand-registry.vercel.app/)
- **Repositorio**: [GitHub](https://github.com/andersondev17/BrandRegistry)


## 🛠 Tecnologías

### Core
```json
{
  "next": "15.0.3",
  "react": "19.0.0-rc-66855b96-20241106",
  "typescript": "^5.7.2"
}
UI/UX
jsonCopy{
  "tailwindcss": "^3.4.1",
  "framer-motion": "^10.16.4",
  "lucide-react": "^0.263.1",
  "shadcn/ui": "^0.3.0"
}
Utilidades
jsonCopy{
  "zod": "^3.22.4",
  "clsx": "^2.0.0",
  "tailwind-merge": "^1.14.0"
}

```

## 🏗 Arquitectura
Design patterns
### 1. Context Pattern (Estado Global)
```typescript
export const BrandProvider = ({ children }: Props) => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  // Gestión centralizada del estado
};
```
### 2. Container/Presentational Pattern

Separation of logic and presentation
Reusable components
Facilitate testing

### 3. Custom Hooks

```typescript
export function useBrands() {
    const context = useContext(BrandContext);
    if (!context) {
        throw new Error('useBrands must be used within a BrandProvider');
    }
    return context;
}

```

### 1. Validation with Zod

```typescript
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
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/,
            {
                message: "Por favor, ingrese un número de teléfono válido."
            }
        )
    }).optional()
});
```
### Data Flow
1. Initial data is loaded from localStorage or falls back to hardcoded data
2. CRUD operations update both the Context state and localStorage
3. UI components react to state changes in real-time

### 🚀 Clone repository

git clone https://github.com/andersondev17/BrandRegistry.git

# Install dependencies
npm install --legacy-peer-deps

# Development
npm run dev

# Production
npm run build
npm start

👨‍💻 
- [Portfolio](https://portfolio-deploy-ebon.vercel.app/)
<div align="center">
</div>

<div align="center">

Developed with ❤️ by Anderson López

</div>
```
