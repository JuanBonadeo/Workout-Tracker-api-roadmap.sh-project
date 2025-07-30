import z from "zod";

export const idSchema = z
    .string()
    .transform((val: string) => parseInt(val))
    .pipe(z.number().int().positive('El ID debe ser un número positivo'))
    .describe('ID del usuario');

export const createWorkoutExerciseSchema = z.object({
    workoutId: idSchema,
    exerciseId: idSchema,
});



export const createSetSchema = z.object({
    workoutExerciseId: idSchema,
    setNumber: z.number().int().min(1, 'El número de serie debe ser al menos 1'),
    reps: z.number().int().min(1, 'Las repeticiones deben ser al menos 1'),
    weight: z.number().int().min(0, 'El peso debe ser un número entero positivo')
});

export type CreateWorkoutExerciseBody = z.infer<typeof createWorkoutExerciseSchema>;
export type CreateSetBody = z.infer<typeof createSetSchema>;