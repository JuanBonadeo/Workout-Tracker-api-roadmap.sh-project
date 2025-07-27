import prisma from "../db/client.js";


export class RoutineExercisesDao {
    async getAll() {
        return prisma.routineExercise.findMany();
    }

    async getOne(id: number) {
        return prisma.routineExercise.findUnique({
            where: { id }
        });
    }
    
    async create(data: any) {
        return prisma.routineExercise.create({ data });
    }

    getByRoutineId(routineId: number) {
        return prisma.routine.findMany({
            where: { id: routineId },
            include: {
                exercises: true
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