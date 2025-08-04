import prisma from "../../db/client.js";
import { CreateSetLogBody, UpdateSetLogBody } from "./setLog.dtos.js";


export class SetlogDao {
    async getAllByUserId(userId: number) {
        return await prisma.setLog.findMany({
            where: { workoutExercise: { workout: { userId } } }
        });
    }

    async getOne(id: number) {
        return await prisma.setLog.findUnique({
            where: { id },
            include: { workoutExercise: { include: { workout: true } } }
        });
    }

    async create(data: CreateSetLogBody) {
        return await prisma.setLog.create({ data });
    }

    async update(id: number, data: UpdateSetLogBody) {
        return await prisma.setLog.update({
            where: { id },
            data,
            include: { workoutExercise: { include: { workout: true } } }
        });
    }

    async delete(id: number) {
        return await prisma.setLog.delete({
            where: { id },
            include: { workoutExercise: { include: { workout: true } } }
        });
    }
}