import { Request, Response } from "express";

import { ErrorHandler, NotFoundError } from "../Helpers/ErrorHandler.js";
import { ResponseHandler } from "../Helpers/ResponseHandler.js";
import { RoutineDao } from "./routine.dao.js";
import { createRoutineSchema, idRoutineParamsSchema, updateRoutineSchema } from "./routine.dtos.js";




export class RoutineController {
    dao: any;

    constructor() {
        this.dao = new RoutineDao();
    }

    async getAll(req: Request, res: Response) {
        try {
            const routines = await this.dao.getAll();
            return ResponseHandler.success(res, routines);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = idRoutineParamsSchema.parse(req.params.id);
            const routine = await this.dao.getOne(id);
            if (!routine) {
                throw new NotFoundError('Rutina no encontrada');
            }
            return ResponseHandler.success(res, routine);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const validatedBody = createRoutineSchema.parse(req.body);
            const newRoutine = await this.dao.create(validatedBody);
            return ResponseHandler.created(res, newRoutine);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = idRoutineParamsSchema.parse(req.params.id);
            const validatedBody = updateRoutineSchema.parse(req.body);
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
            return ResponseHandler.success(res, null, 'Rutina eliminada correctamente');
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }
}