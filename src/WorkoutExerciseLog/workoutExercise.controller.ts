import { Request, Response } from "express";
import { ErrorHandler, NotFoundError } from "../Helpers/ErrorHandler.js";
import { ResponseHandler } from "../Helpers/ResponseHandler.js";
import { WorkouExerciseDao } from "./workoutExercise.dao.js";
import { createWorkoutExerciseSchema, idSchema } from "./workoutExercise.dtos.js";


export class WorkoutExerciseController {
    private dao: WorkouExerciseDao;
    constructor() {
        this.dao = new WorkouExerciseDao();
    }

    async getAll(req: Request, res: Response) {
            try {
                const workoutsExercises = await this.dao.getAll();
                return ResponseHandler.success(res, workoutsExercises);
            } catch (error) {
                return ErrorHandler.handle(error, res);
            }
        }
    
        async getOne(req: Request, res: Response) {
            try {
                const id = idSchema.parse(req.params.id);
                const workoutExercise = await this.dao.getOne(id);
                if (!workoutExercise) {
                    throw new NotFoundError('Ejercicio en workout no encontrado');
                }
                return ResponseHandler.success(res, workoutExercise);
            } catch (error) {
                return ErrorHandler.handle(error, res);
            }
        }
    
        async create(req: Request, res: Response) {
            try {
                const data = createWorkoutExerciseSchema.parse(req.body);
                const workoutExercise = await this.dao.create(data);
                return ResponseHandler.created(res, workoutExercise);
            } catch (error) {
                return ErrorHandler.handle(error, res);
            }
        }
    
    
        async delete(req: Request, res: Response) {
            try {
                const id = idSchema.parse(req.params.id);
                await this.dao.delete(id);
                return ResponseHandler.success(res, null, 'Ejercicio del Entrenamiento eliminado correctamente');
            } catch (error) {
                return ErrorHandler.handle(error, res);
            }
        }
    
        
}