import { z } from 'zod';


const passwordRegex = /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)[A-Za-zА-Яа-яЁё\d]+$/;

// Обязательное наличие хотя бы одной строчной, одной прописной буквы и одной цифры

export const registerSchema = z
    .object({
        firstName: z.string().min(1, 'Укажите имя'),
        lastName: z.string().min(1, 'Укажите фамилию'),
        email: z.string().email('Некорректный email'),
        password: z
            .string()
            .min(8, 'Минимум 8 символов')
            .regex(passwordRegex, 'Пароль должен содержать заглавные и строчные буквы (русские или английские) и цифры'),
        confirm: z.string().min(8, 'Повторите пароль'),
        consent: z.preprocess(
            (val) => val === 'on' || val === true || val === 'true',
            z.boolean().refine((v) => v === true, {
                message: 'Требуется согласие на обработку персональных данных',
            })
        ),
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
