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
            const userId = (req as any).user.id;
            const validatedBody = updateUserSchema.parse(req.body);
            const updatedUser = await this.dao.update(userId, validatedBody);
            return ResponseHandler.updated(res, updatedUser);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        const userId = (req as any).user.id;
        try {
            await this.dao.delete(userId);
            return ResponseHandler.success(res, null);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }
}