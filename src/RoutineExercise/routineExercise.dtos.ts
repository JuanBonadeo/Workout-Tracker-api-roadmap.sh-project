import { z } from 'zod';

export const createRoutineExerciseSchema = z.object({
    routineId: z.number().int().positive('El ID de la rutina debe ser un número positivo'),
    exerciseId: z.number().int().positive('El ID del ejercicio debe ser un número positivo'),
    sets: z.number().int().min(1, 'El número de series debe ser al menos 1').default(3),
    reps: z.number().int().min(1, 'El número de repeticiones debe ser al menos 1').default(10),
    rest: z.number().int().min(0, 'El tiempo de descanso no puede ser negativo').default(180), // in seconds
    weight: z.number().int().min(0, 'El peso no puede ser negativo').max(400, 'El peso no puede exceder los 400 kg').default(0) // in kg

});


export const updateRoutineExerciseSchema = z.object({
    routineId: z.number().int().positive('El ID de la rutina debe ser un número positivo'),
    exerciseId: z.number().int().positive('El ID del ejercicio debe ser un número positivo'),
    sets: z.number().int().min(1, 'El número de series debe ser al menos 1').default(3).optional(),
    reps: z.number().int().min(1, 'El número de repeticiones debe ser al menos 1').default(10).optional(),
    rest: z.number().int().min(0, 'El tiempo de descanso no puede ser negativo').default(180).optional(), // in seconds
    weight: z.number().int().min(0, 'El peso no puede ser negativo').max(400, 'El peso no puede exceder los 400 kg').default(0).optional() // in kg
});

export const idRoutineParamsSchema = z
    .string()
    .transform((val: string) => parseInt(val))
    .pipe(z.number().int().positive('El ID debe ser un número positivo'))
    .describe('ID de la rutina');

export const idExerciseParamsSchema = z
    .string()
    .transform((val: string) => parseInt(val))
    .pipe(z.number().int().positive('El ID debe ser un número positivo'))
    .describe('ID del ejercicio');

export type CreateRoutineBody = z.infer<typeof createRoutineExerciseSchema>;
export type UpdateRoutineBody = z.infer<typeof updateRoutineExerciseSchema>;
export type RoutineParams = z.infer<typeof idRoutineParamsSchema>;
export type ExerciseParams = z.infer<typeof idExerciseParamsSchema>;