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

export type CreateWorkoutExerciseBody = z.infer<typeof createWorkoutExerciseSchema>;