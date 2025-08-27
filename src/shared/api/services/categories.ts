// src/shared/api/services/categories.ts
import { api } from '@/shared/api/axios';
import type { CategoryItem, CategoryNode } from '@/entities/category/model/types';

// GET /categories — возвращает массив с объектами, где level=0 и их children
export async function fetchRootCategories(): Promise<CategoryItem[]> {
    const { data } = await api.get<CategoryItem[]>('categories');
    // На бэке может вернуться массив, где level=0 — корни; фильтруем на всякий
    return Array.isArray(data) ? data.filter(x => x.level === 0) : [];
}

// GET /categories/{id} — возвращает один узел с children и pathItems
export async function fetchCategoryById(id: string): Promise<CategoryNode> {
    const { data } = await api.get<CategoryNode>(`categories/${id}`);
    return data;
}
