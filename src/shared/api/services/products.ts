// src/shared/api/services/products.ts
import { api } from '@/shared/api/axios';

export type ProductImage = {
    id: string;
    imageUrl: string;
    isMain: boolean;
    sortOrder: number;
};

export type ProductBrand = {
    id: string;
    name: string;
    description: string | null;
    logoUrl: string | null;
    countryOfOrigin: string | null;
    isActive: boolean;
};

export type ProductCurrency = {
    id: string;
    code: string;
    name: string;
    rateToBase: number;
    isBase: boolean;
};

export type ProductCategoryRef = {
    id: string;
    name: string;
    logoUrl: string | null;
    parentId: string | null;
    path: string | null;
    sortOrder: number;
    isActive: boolean;
    level: number;
    pathItems: { id: string; name: string }[];
    children: unknown[];
};

export type ProductItem = {
    id: string;
    name: string;
    sku: string;
    price: number;
    currency: ProductCurrency;
    brand: ProductBrand;
    brandName: string;
    currencyCode: string;
    categories: ProductCategoryRef[];
    images: ProductImage[];
    descriptions: unknown[];
    characteristics: Record<string, unknown>;
    stockQuantity: number;
    isActive: boolean;
    createdAt: string;
};

export type ProductsResponse = {
    items: ProductItem[];
    totalCount: number;
    page: number;
    pageSize: number;
};

export async function fetchProductsByCategoryId(categoryId: string, params?: { page?: number; pageSize?: number }) {
    const { page = 1, pageSize = 20 } = params ?? {};
    const { data } = await api.get<ProductsResponse>(`categories/${categoryId}/products`, {
        params: { page, pageSize },
    })

    return data;
}
