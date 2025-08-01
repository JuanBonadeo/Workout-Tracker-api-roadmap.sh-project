import { Request, Response } from "express";
import { ResponseHandler } from "../../Helpers/ResponseHandler.js";
import { WorkoutDao } from "./workout.dao.js";
import { createWorkoutSchema, idSchema, UpdateWorkoutBody, updateWorkoutSchema } from "./workout.dtos.js";
import { ErrorHandler } from "../../Helpers/ErrorHandler.js";
import { RoutineDao } from "../Routine/routine.dao.js";
import { WorkouExerciseDao } from "../WorkoutExerciseLog/workoutExercise.dao.js";


export class WorkoutController {
    private dao: WorkoutDao;
    private routineDao: RoutineDao;
    private workoutExDao: WorkouExerciseDao;

    constructor() {
        this.dao = new WorkoutDao();
        this.routineDao = new RoutineDao();
        this.workoutExDao = new WorkouExerciseDao();
    }

    async getAll(req: Request, res: Response) {
        try {
            const workouts = await this.dao.getAll();
            return ResponseHandler.success(res, workouts);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = idSchema.parse(req.params.id);
            const workout = await this.dao.getOne(id);
            return ResponseHandler.success(res, workout);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }
    async create(req: Request, res: Response) {
        try {
            const data = createWorkoutSchema.parse(req.body);
            const workout = await this.dao.create(data);
            return ResponseHandler.created(res, workout);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async createWithExercises(req: Request, res: Response) {
        try {
            const data = createWorkoutSchema.parse(req.body);
            const workout = await this.dao.create(data);
            const exercises = await this.routineDao.getExercisesByRoutineId(data.routineId);
            if (exercises.length > 0) {
                for (const exercise of exercises) {
                    console.log(`Creating workout exercise for workout ID: ${workout.id} and exercise ID: ${exercise.id}`);
                    await this.workoutExDao.create({
                        workoutId: workout.id,
                        exerciseId: exercise.id
                    });
                }
            }

            return ResponseHandler.created(res, { workout: exercises});
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = idSchema.parse(req.params.id);
            const data = updateWorkoutSchema.parse(req.body);
            const workout = await this.dao.update(id, data);
            return ResponseHandler.updated(res, workout);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = idSchema.parse(req.params.id);
            await this.dao.delete(id);
            return ResponseHandler.success(res, null, 'Entrenamiento eliminado correctamente');
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const userId = idSchema.parse(req.params.userId);
            const workouts = await this.dao.getByUserId(userId);
            return ResponseHandler.success(res, workouts);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }
}