import {create} from 'zustand';
import { getCart } from '@/shared/api/services/cart';

export type CartProduct = {
    id: string;
    name: string;
    sku: string;
    price: number;
    currencyCode: string;
    brandName?: string;
    images?: { imageUrl: string }[];
};
export type CartItem = {
    id: string;
    product: CartProduct;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
};
export type CartResponse2 = {
    id: string;
    items: CartItem[];
    totalAmount: number;
    createdAt: string;
};

type CartState = {
    cart: CartResponse | null;
    loading: boolean;
    error: string | null;

    // Actions
    setCart: (cart: CartResponse) => void;
    fetchCart: (token: string) => Promise<void>;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
    cart: null,
    loading: false,
    error: null,

    setCart: (cart) => set({ cart }),

    fetchCart: async (token) => {
        set({ loading: true, error: null });
        try {
            const cart = await getCart(token);
            set({ cart, loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Ошибка загрузки корзины', loading: false });
        }
    },

    removeItem: (productId: string) => {
        const { cart } = get();
        if (!cart) return;
        const updatedItems = cart.items.filter(item => item.productId !== productId);
        set({
            cart: {
                ...cart,
                items: updatedItems,
                itemCount: updatedItems.reduce((acc, i) => acc + i.quantity, 0),
                totalPrice: updatedItems.reduce((acc, i) => acc + i.price, 0),
                totalAmount: updatedItems.reduce((acc, i) => acc + i.price, 0),
            },
        });
    },

    updateQuantity: (productId: string, quantity: number) => {
        const { cart } = get();
        if (!cart) return;

        const updatedItems = cart.items.map(item => {
            if (item.productId === productId) {
                // ✅ Используем price напрямую, не пересчитываем
                return {
                    ...item,
                    quantity
                };
            }
            return item;
        }).filter(item => item.quantity > 0);

        const newItemCount = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
        const newTotalPrice = updatedItems.reduce((acc, item) => acc + item.price, 0);

        set({
            cart: {
                ...cart,
                items: updatedItems,
                itemCount: newItemCount,
                totalPrice: newTotalPrice,
                totalAmount: newTotalPrice,
            },
        });
    },
}));

export type CartImage = {
    id: string;
    imageUrl: string;
    isMain: boolean;
    sortOrder: number;
};

export type CartItemType = {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;       // Общая цена за этот товар с текущим количеством
    unitPrice: number;   // Цена за единицу, может быть 0, если сервер не возвращает
    currencyCode: string;
    brandId: string | null;
    brandName: string | null;
    images: CartImage[];
};

export type CartResponse = {
    id: string;
    userId: string;
    items: CartItemType[];
    totalPrice: number;  // Итоговая цена корзины
    totalAmount: number; // Скорее дубль totalPrice, можно использовать для сравнения
    itemCount: number;   // Кол-во товаров в корзине (сумма quantity)
    createdAt: string;

};