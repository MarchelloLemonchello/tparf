import { create } from 'zustand';
import { getCart } from '@/shared/api/services/cart';

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
    price: number;
    unitPrice: number;
    currencyCode: string;
    brandId: string | null;
    brandName: string | null;
    images: CartImage[];
};

export type CartResponse = {
    id: string;
    userId: string;
    items: CartItemType[];
    totalPrice: number;
    totalAmount: number;
    itemCount: number;
    createdAt: string;
};

// ✅ Исправленный тип состояния
type CartState = {
    cart: CartResponse | null;
    loading: boolean;
    error: string | null;

    // Actions
    setCart: (cart: CartResponse) => void;
    fetchCart: (token: string) => Promise<void>; // ✅ Добавили в тип
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
    cart: null,
    loading: false,
    error: null,

    setCart: (cart) => set({ cart }),

    // ✅ Метод для полной синхронизации с сервером
    fetchCart: async (token) => {
        set({ loading: true, error: null });
        try {
            const cart = await getCart(token);
            set({ cart, loading: false });
        } catch (error: unknown) {
            set({
                error: error instanceof Error ? error.message : 'Ошибка загрузки корзины',
                loading: false
            });
        }
    },

    removeItem: (productId: string) => {
        const { cart } = get();
        if (!cart) return;

        const updatedItems = cart.items.filter(item => item.productId !== productId);
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

    updateQuantity: (productId: string, quantity: number) => {
        const { cart } = get();
        if (!cart) return;

        const updatedItems = cart.items.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity };
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
