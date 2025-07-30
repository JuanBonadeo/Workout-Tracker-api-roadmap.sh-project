import { Request, Response } from "express";
import { ErrorHandler, NotFoundError } from "../Helpers/ErrorHandler.js";
import { ResponseHandler } from "../Helpers/ResponseHandler.js";
import { SetlogDao } from "./setLog.dao.js";
import { CreateSetLogSchema, idSchema, UpdateSetLogSchema } from "./setLog.dtos.js";




export class SetLogController {
    private dao: SetlogDao;
    constructor() {
        this.dao = new SetlogDao();
    }
    async getAll(req: Request, res: Response) {
        try {
            const setLogs = await this.dao.getAll();
            return ResponseHandler.success(res, setLogs);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = idSchema.parse(req.params.id);
            const setLog = await this.dao.getOne(id);
            if (!setLog) {
                throw new NotFoundError('Set log not found');
            }
            return ResponseHandler.success(res, setLog);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = CreateSetLogSchema.parse(req.body); 
            const setLog = await this.dao.create(data);
            return ResponseHandler.created(res, setLog);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = idSchema.parse(req.params.id);
            const data = UpdateSetLogSchema.parse(req.body); 
            const setLog = await this.dao.update(id, data);
            return ResponseHandler.updated(res, setLog);
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = idSchema.parse(req.params.id);
            await this.dao.delete(id);
            return ResponseHandler.success(res, null, 'Set log deleted successfully');
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    
}


