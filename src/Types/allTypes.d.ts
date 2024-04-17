import { z } from 'zod';

export const SignUpSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(5, "Password must be atleast 5 characters")
        .max(20),
    confirm: z.string()
}).refine(data => data.password === data.confirm, {
    message: 'Password must match',
    path: ['confirm']
});

export type TsignUpSchema = z.infer<typeof SignUpSchema>