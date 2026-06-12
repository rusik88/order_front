import { z } from 'zod';

export const roleFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Title is required')
        .max(255, 'Title is too long'),

    slug: z
        .string()
        .min(3, 'Slug is required')
        .max(255, 'Slug is too long')
        .regex(
            /^[a-z0-9_-]+$/,
            'Only lowercase letters, numbers, dash and underscore'
        ),

    permissions: z.array(z.string()).optional()
});

export type RoleFormData =
    z.infer<typeof roleFormSchema>;