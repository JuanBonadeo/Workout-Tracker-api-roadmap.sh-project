import { z } from 'zod';
import { Category, Difficulty } from '../Exercise/exercise.dtos.js';

export const createRoutineSchema = z.object({
    name: z.string()
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder los 100 caracteres'),

    description: z.string()
        .trim()
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(255, 'La descripción no puede exceder los 255 caracteres'),

    aproxDuration: z.number()
        .int()
        .min(1, 'La duración aproximada debe ser al menos 1 minuto')
        .max(1440, 'La duración aproximada no puede exceder 1440 minutos'), // 24 horas
    difficulty: z.nativeEnum(Difficulty, {
        error: () => ({ message: 'Dificultad inválida' })
    }),

    category: z.nativeEnum(Category, {
        error: () => ({ message: 'Categoría inválida' })
    }),


});


export const updateRoutineSchema = z.object({
    name: z.string()
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder los 100 caracteres')
        .optional(),

    description: z.string()
        .trim()
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(255, 'La descripción no puede exceder los 255 caracteres')
        .optional(),
    aproxDuration: z.number()
        .int()
        .min(1, 'La duración aproximada debe ser al menos 1 minuto')
        .max(1440, 'La duración aproximada no puede exceder 1440 minutos') // 24 horas
        .optional(),
        
    difficulty: z.nativeEnum(Difficulty, {
        error: () => ({ message: 'Dificultad inválida' })
    }).optional(),

    category: z.nativeEnum(Category, {
        error: () => ({ message: 'Categoría inválida' })
    }).optional(),
});

export const idRoutineParamsSchema = z
    .string()
    .transform((val: string) => parseInt(val))
    .pipe(z.number().int().positive('El ID debe ser un número positivo'))
    .describe('ID de la rutina');


export type CreateRoutineBody = z.infer<typeof createRoutineSchema>;
export type UpdateRoutineBody = z.infer<typeof updateRoutineSchema>;
export type RoutineParams = z.infer<typeof idRoutineParamsSchema>;