import { Request, Response } from "express";

import { ErrorHandler, NotFoundError } from "../Helpers/ErrorHandler.js";
import { RoutineExerciseDao } from "./routineExercise.dao.js";
import { ResponseHandler } from "../Helpers/ResponseHandler.js";
import { createRoutineExerciseSchema, idRoutineParamsSchema, updateRoutineExerciseSchema } from "./routineExercise.dtos.js";





export class RoutineExerciseController {
    dao: any;

    constructor() {
        this.dao = new RoutineExerciseDao();
    }

    async create(req: Request, res: Response) {
        try {
            const validatedBody = createRoutineExerciseSchema.parse(req.body);
            const newRoutineExercise = await this.dao.create(validatedBody);
            return ResponseHandler.created(res, newRoutineExercise);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = idRoutineParamsSchema.parse(req.params.id);
            const routineExercise = await this.dao.getOne(id);
            if (!routineExercise) {
                throw new NotFoundError('Ejercicio en rutina no encontrado');
            }
            return ResponseHandler.success(res, routineExercise);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }


    async getByRoutineId(req: Request, res: Response) {
        try {
            const routineId = idRoutineParamsSchema.parse(req.params.routineId);
            const routineExercises = await this.dao.getByRoutineId(routineId);
            if (!routineExercises) {
                throw new NotFoundError('No se encontraron ejercicios para esta rutina');
            }
            return ResponseHandler.success(res, routineExercises);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }


    async update(req: Request, res: Response) {
        try {
            const id = idRoutineParamsSchema.parse(req.params.id);
            const validatedBody = updateRoutineExerciseSchema.parse(req.body);
            const updatedRoutine = await this.dao.update(id, validatedBody);
            return ResponseHandler.updated(res, updatedRoutine);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        const id = idRoutineParamsSchema.parse(req.params.id);
        try {
            await this.dao.delete(id);
            return ResponseHandler.success(res, null, 'Ejercicio en rutina eliminado correctamente');
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }
}