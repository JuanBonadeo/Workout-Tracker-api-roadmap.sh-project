import { z } from 'zod';

export enum MuscleGroup {
    CHEST = 'CHEST',
    BACK = 'BACK',
    SHOULDERS = 'SHOULDERS',
    BICEPS = 'BICEPS',
    TRICEPS = 'TRICEPS',
    LEGS = 'LEGS',
    GLUTES = 'GLUTES',
    ABS = 'ABS',
    CARDIO = 'CARDIO'
}

export enum Difficulty {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED'
}

export enum Category {
    STRENGTH = 'STRENGTH',
    CARDIO = 'CARDIO',
    FLEXIBILITY = 'FLEXIBILITY',
    MOBILITY = 'MOBILITY',
    PLYOMETRIC = 'PLYOMETRIC'
}

export enum Equipment {
    DUMBBELLS = 'DUMBBELLS',
    BARBELL = 'BARBELL',
    KETTLEBELL = 'KETTLEBELL',
    RESISTANCE_BANDS = 'RESISTANCE_BANDS',
    BODYWEIGHT = 'BODYWEIGHT',
    MACHINES = 'MACHINES',
    MEDICINE_BALL = 'MEDICINE_BALL',
    BOSU_BALL = 'BOSU_BALL',
    YOGA_MAT = 'YOGA_MAT',
}


export const createExerciseSchema = z.object({
    name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'El nombre no puede exceder los 100 caracteres'),
    description: z.string().trim().min(10, 'La descripción debe tener al menos 10 caracteres').max(255, 'La descripción no puede exceder los 255 caracteres'),
    muscularGroup: z.nativeEnum(MuscleGroup, {error: () => ({ message: 'Grupo muscular inválido' })
    }),
    difficulty: z.nativeEnum(Difficulty, {error: () => ({ message: 'Dificultad inválida' })
    }),
    category: z.nativeEnum(Category, {error: () => ({ message: 'Categoría inválida' })
    }),
    equipment: z.array(z.nativeEnum(Equipment)).optional().default([]),

});


export const updateExerciseSchema = z.object({
    name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'El nombre no puede exceder los 100 caracteres').optional(),
    description: z.string().trim().min(10, 'La descripción debe tener al menos 10 caracteres').max(255, 'La descripción no puede exceder los 255 caracteres').optional(),
    muscularGroup: z.nativeEnum(MuscleGroup).optional(),
    difficulty: z.nativeEnum(Difficulty).optional(),
    category: z.nativeEnum(Category).optional(),
    equipment: z.array(z.nativeEnum(Equipment)).optional().default([]),
});


export const idExerciseParamsSchema = z
    .string()
    .transform((val: string) => parseInt(val))
    .pipe(z.number().int().positive('El ID debe ser un número positivo'))
    .describe('ID del ejercicio');


export type CreateExerciseBody = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseBody = z.infer<typeof updateExerciseSchema>;
export type ExerciseParams = z.infer<typeof idExerciseParamsSchema>;