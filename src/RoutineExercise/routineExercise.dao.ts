import prisma from "../database/prisma/client.js";


export class RoutineExerciseDao {
    async create(data: any) {
        return prisma.routineExercise.create({ data });
    }

    async getOne(id: number) {
        return prisma.routineExercise.findUnique({
            where: { id }
        });
    }
    getByRoutineId(routineId: number) {
        return prisma.routineExercise.findMany({
            where: { routineId },
            include: {
                exercise: true 
            }
        });
    }

    async update(id: number, data: any) {
        return prisma.routineExercise.update({
            where: { id },
            data
        });
    }
    
    async delete(id: number) {
        return prisma.routineExercise.delete({
            where: { id }
        });
    }
}