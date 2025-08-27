import { api } from '@/shared/api/axios';

export type ProductDetail = {
    id: string;
    name: string;
    sku: string;
    price: number;
    currencyCode: string;
    brandName: string;
    images: { id: string; imageUrl: string; isMain: boolean; sortOrder: number }[];
    descriptions: { id: string; type: number; content: string; sortOrder: number }[];
    characteristics: Record<string, unknown>;
    categories: {
        id: string;
        name: string;
        pathItems: { id: string; name: string }[];
    }[];
};

export async function fetchProductById(id: string): Promise<ProductDetail> {
    const { data } = await api.get<ProductDetail>(`products/${id}`);
    return data;
}
