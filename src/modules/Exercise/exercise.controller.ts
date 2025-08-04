import { Request, Response } from "express";
import { ExerciseDao } from "./exercise.dao.js";
import { createExerciseSchema, idExerciseParamsSchema, updateExerciseSchema } from "./exercise.dtos.js";
import { ErrorHandler, NotFoundError } from "../../Helpers/ErrorHandler.js";
import { ResponseHandler } from "../../Helpers/ResponseHandler.js";




export class ExerciseController {
    dao: any;

    constructor() {
        this.dao = new ExerciseDao();
    }

    async getAll(req: Request, res: Response) {
        try {
            const exercises = await this.dao.getAll();
            return ResponseHandler.success(res, exercises);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = idExerciseParamsSchema.parse(req.params.id);
            const exercise = await this.dao.getOne(id);
            if (!exercise) {
                throw new NotFoundError()
            }
            return ResponseHandler.success(res, exercise);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const validatedBody = createExerciseSchema.parse(req.body);
            const newExercise = await this.dao.create(validatedBody);
            return ResponseHandler.created(res, newExercise);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = idExerciseParamsSchema.parse(req.params.id);
            const validatedBody = updateExerciseSchema.parse(req.body);
            const updatedExercise = await this.dao.update(id, validatedBody);
            return ResponseHandler.updated(res, updatedExercise);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        const id = idExerciseParamsSchema.parse(req.params.id);
        try {
            await this.dao.delete(id);
            return ResponseHandler.success(res, null);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }
}