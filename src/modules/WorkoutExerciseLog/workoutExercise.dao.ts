import prisma from "../../db/client.js";
import { CreateWorkoutExerciseBody } from "./workoutExercise.dtos.js";

export class WorkouExerciseDao {
    async getAll() {
        return await prisma.workoutExerciseLog.findMany();
    }

    async getOne(id: number) {
        return await prisma.workoutExerciseLog.findUnique(
            {
                where: { id },
                include: { setsDetails: true }
            });
    }

    async create(data: CreateWorkoutExerciseBody) {
        return await prisma.workoutExerciseLog.create({ data });
    }


    async delete(id: number) {
        return await prisma.workoutExerciseLog.delete({
            where: { id }
        });
    }


 

}