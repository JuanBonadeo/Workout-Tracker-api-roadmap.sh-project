import prisma from "../db/client.js";
import { CreateWorkoutBody, UpdateWorkoutBody } from "./workout.dtos.js";


export class WorkoutDao {
    async getOne(id: number) {
        return prisma.workout.findUnique({
            where: { id },
            include: { 
                exercises: {
                    include: {
                        exercise: true,
                        setsDetails: true
                    }
                },
            }
        });
    }
    
    async getAll() {
        return prisma.workout.findMany();
    }

    async create(data: CreateWorkoutBody) {
        return prisma.workout.create({ data });
    }

    async update(id: number, data: UpdateWorkoutBody) {
        return prisma.workout.update({
            where: { id },
            data
        });
    }

    async delete(id: number) {
        return prisma.workout.delete({
            where: { id }
        });
    }

    async getByUserId(userId: number) {
        return await prisma.workout.findMany({
            where: { userId },
            include: { 
                exercises: {
                    include: {
                        exercise: true,
                        setsDetails: true
                    }
                },
                _count: {
                    select: { exercises: true }
                },
                
            
            }
        });
    }
}