import { z } from 'zod';

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

export const registerSchema = z
    .object({
        firstName: z.string().min(1, 'Укажите имя'),
        lastName: z.string().min(1, 'Укажите фамилию'),
        company: z.string().min(1, 'Укажите название компании'),
        phone: z.string().regex(phoneRegex, 'Некорректный номер телефона'),
        email: z.string().email('Некорректный email'),
        password: z.string().min(8, 'Минимум 8 символов'),
        confirm: z.string().min(8, 'Повторите пароль'),
        consent: z
            .preprocess((val) => val === 'on' || val === true || val === 'true', z.boolean())
            .refine((v) => v === true, { message: 'Требуется согласие' }),
    })
    .refine((data) => data.password === data.confirm, {
        message: 'Пароли не совпадают',
        path: ['confirm'],
    });

export const loginSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(1, 'Укажите пароль'),
});

export type RegisterSchema = typeof registerSchema;
export type LoginSchema = typeof loginSchema;
