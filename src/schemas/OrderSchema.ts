import { z } from 'zod';

export const ordersFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(255, 'Name is too long'),

    order_status_id: z
        .number()
        .min(1, 'Order status is required'),

    total: z
        .string()
        .trim()
        .min(1, 'Total is required')
        .regex(/^\d+(\.\d{1,2})?$/, 'Total must be a valid amount'),

    comment: z
        .string()
        .max(1000, 'Comment is too long')
        .optional(),
});

export type OrdersFormData =
    z.infer<typeof ordersFormSchema>;