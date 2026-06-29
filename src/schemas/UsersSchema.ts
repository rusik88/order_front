import { z } from 'zod';

export const userUpdateFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(255, 'Name is too long'),

    email: z
        .string()
        .min(3, 'Email is required')
        .max(255, 'Email is too long')
        .email('Invalid email format'),

    role_id: z.number(),

    password: z.string().optional(),
    password_confirmation: z.string().optional(),
})
.refine(
    (data: { name: string, email: string, password?: string, password_confirmation?: string }) => {
        if (data.password && data.password.length < 8) return false;
        return true;
    },
    {
        message: 'Password must be at least 8 characters',
        path: ['password'],
    }
)
.refine(
    (data: { name: string, email: string, password?: string, password_confirmation?: string }) => {
        if (data.password) {
            return data.password === data.password_confirmation;
        }
        return true;
    },
    {
        message: 'Passwords do not match',
        path: ['password_confirmation'],
    }
);

export type UserUpdateFormData =
    z.infer<typeof userUpdateFormSchema>;