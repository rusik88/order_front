import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email('Email is required and must be valid'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    device: z.string(),
});

export const registerSchema = z.object({
    name: z.string().min(3, 'Name is required and must be must be at least 3 characters'),
    email: z.email('Email is required and must be valid'),
    password: z.string().min(6),
    device: z.string(),
    password_confirmation: z.string().min(6, 'Password must be at least 6 characters'),
}).refine(data => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
});

export type LoginFormDataType = z.infer<typeof loginSchema>;
export type RegisterFormDataType = z.infer<typeof registerSchema>;