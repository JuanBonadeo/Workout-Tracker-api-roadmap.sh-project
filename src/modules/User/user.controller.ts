import { Request, Response } from "express";
import { ErrorHandler } from "../../Helpers/ErrorHandler.js";
import { ResponseHandler } from "../../Helpers/ResponseHandler.js";
import { UserDao } from "./user.dao.js";
import { idUserParamsSchema, updateUserSchema } from './user.dtos.js';




export class UserController {
    dao: any;

    constructor() {
        this.dao = new UserDao();
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await this.dao.getAll();
            return ResponseHandler.success(res, users);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = idUserParamsSchema.parse(req.params.id);
            const validatedBody = updateUserSchema.parse(req.body);
            const updatedExercise = await this.dao.update(id, validatedBody);
            return ResponseHandler.updated(res, updatedExercise);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        const id = idUserParamsSchema.parse(req.params.id);
        try {
            await this.dao.delete(id);
            return ResponseHandler.success(res, null, 'Usuario eliminado');
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }
}