import prisma from "../../db/client.js";
import { CreateWorkoutExerciseBody } from "./workoutExercise.dtos.js";

export class WorkouExerciseDao {
    async getAllByUserId(userId: number) {
        return await prisma.workoutExerciseLog.findMany({
            where: { workout: { userId } },
        });
    }

    async getOne(id: number) {
        return await prisma.workoutExerciseLog.findUnique(
            {
                where: { id },
                include: { setsDetails: true, workout: true }
            });
    }

    async create(data: CreateWorkoutExerciseBody) {
        return await prisma.workoutExerciseLog.create(
            {
                data,
                include: {
                    workout: true
                }

            },

        );
    }


    async delete(id: number) {
        return await prisma.workoutExerciseLog.delete({
            where: { id }
        });
    }




}