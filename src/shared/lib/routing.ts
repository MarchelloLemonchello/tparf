// src/shared/lib/routing.ts
export const catalogRootPath = '/catalog';

export function buildCategoryPathFromCrumbs(crumbs: { id: string }[]) {
    // Преобразует массив {id} в URL вида /catalog/id1/id2/...
    const ids = crumbs.map(c => c.id).filter(Boolean);
    return [catalogRootPath, ...ids].join('/').replace(/\/+/g, '/');
}

export function buildCategoryPathByIds(ids: string[]) {
    return [catalogRootPath, ...ids].join('/').replace(/\/+/g, '/');
}
