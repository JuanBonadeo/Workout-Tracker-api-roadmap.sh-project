import prisma from "../db/client.js";


export class RoutineDao {
    async getAll() {
        return prisma.routine.findMany();
    }
    async getOne(id: number) {
        return prisma.routine.findUnique({
            where: { id }
        });
    }
    async create(data: any) {
        return prisma.routine.create({ data });
    }

    async update(id: number, data: any) {
        return prisma.routine.update({
            where: { id },
            data
        });
    }
    async delete(id: number) {
        return prisma.routine.delete({
            where: { id }
        });
    }
}