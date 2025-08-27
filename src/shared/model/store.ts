// src/shared/model/store.ts
'use client';
import { create } from 'zustand';

type CounterState = {
    count: number;
    increment: () => void;
    reset: () => void;
};

export const useCounter = create<CounterState>((set) => ({
    count: 0,
    increment: () => set((s) => ({ count: s.count + 1 })),
    reset: () => set({ count: 0 }),
}));