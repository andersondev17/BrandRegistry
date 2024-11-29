import { Metadata } from 'next';

interface GenerateMetadataProps {
    title: string;
    description: string;
    path: string;
}

export function generateMetadata({
    title,
    description,
    path
}: GenerateMetadataProps): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return {
        title: `${title} | Sistema de Registro de Marcas`,
        description,
        openGraph: {
            title,
            description,
            url: `${baseUrl}${path}`,
            siteName: 'Sistema de Registro de Marcas',
            locale: 'es_CO',
            type: 'website',
        },
        alternates: {
            canonical: `${baseUrl}${path}`,
        }
    };
}