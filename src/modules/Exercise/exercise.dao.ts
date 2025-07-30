import prisma from "../db/client.js";


export class ExerciseDao {
    async getAll() {
        return prisma.exercise.findMany();
    }
    async getOne(id: number) {
        return prisma.exercise.findUnique({
            where: { id }
        });
    }
    async create(data: any) {
        return prisma.exercise.create({ data });
    }

    async update(id: number, data: any) {
        return prisma.exercise.update({
            where: { id },
            data
        });
    }
    async delete(id: number) {
        return prisma.exercise.delete({
            where: { id }
        });
    }
}