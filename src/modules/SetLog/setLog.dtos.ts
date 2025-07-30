import z from "zod";

export const idSchema = z
    .string()
    .transform((val: string) => parseInt(val))
    .pipe(z.number().int().positive('El ID debe ser un número positivo'))
    .describe('ID del usuario');


export const CreateSetLogSchema = z.object({
    workoutExerciseId: idSchema,
    setNumber: z.number().int().min(1, 'El número de serie debe ser al menos 1'),
    reps: z.number().int().min(1, 'Las repeticiones deben ser al menos 1'),
    weight: z.number().int().min(0, 'El peso debe ser un número entero positivo')
});

export const UpdateSetLogSchema = z.object({
    setNumber: z.number().int().min(1, 'El número de serie debe ser al menos 1').optional(),
    reps: z.number().int().min(1, 'Las repeticiones deben ser al menos 1').optional(),
    weight: z.number().int().min(0, 'El peso debe ser un número entero positivo').optional()
});

export type CreateSetLogBody = z.infer<typeof CreateSetLogSchema>;
export type UpdateSetLogBody = z.infer<typeof UpdateSetLogSchema>;