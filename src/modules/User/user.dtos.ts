import z from "zod";


export const idUserParamsSchema = z
    .string()
    .transform((val: string) => parseInt(val))
    .pipe(z.number().int().positive('El ID debe ser un número positivo'))
    .describe('ID del usuario');

export const updateUserSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    age: z.number().min(0).optional(),
    height: z.number().min(0).optional(),
    weight: z.number().min(0).optional(),
})


