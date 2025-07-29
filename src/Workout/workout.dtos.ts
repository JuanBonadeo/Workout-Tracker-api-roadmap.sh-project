import z from "zod";

export const idSchema = z
    .string()
    .transform((val: string) => parseInt(val))
    .pipe(z.number().int().positive('El ID debe ser un número positivo'))
    .describe('ID del usuario');

export const createWorkoutSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'El nombre no puede exceder los 100 caracteres'),
    description: z.string().min(2, 'La descripción debe tener al menos 2 caracteres').max(500, 'La descripción no puede exceder los 500 caracteres'),
    userId: idSchema,
    routineId: idSchema,
    date: z.date().default(() => new Date()),
    durationRegistered: z.number().min(0).optional(),
});

export const updateWorkoutSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().min(2).max(500).optional(),
    durationRegistered: z.number().min(0).optional(),
    date: z.date().optional()
});

export const idWorkoutParamsSchema = z
    .string()
    .transform((val: string) => parseInt(val))
    .pipe(z.number().int().positive('El ID debe ser un número positivo'))
    .describe('ID del entrenamiento');


export type CreateWorkoutBody = z.infer<typeof createWorkoutSchema>;
export type UpdateWorkoutBody = z.infer<typeof updateWorkoutSchema>;