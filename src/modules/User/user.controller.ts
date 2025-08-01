import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ErrorHandler, NotFoundError, UnauthorizedError } from "../../Helpers/ErrorHandler.js";
import { ResponseHandler } from "../../Helpers/ResponseHandler.js";
import { UserDao } from "./user.dao.js";
import { createUserSchema, idUserParamsSchema, signinUserSchema, updateUserSchema } from './user.dtos.js';
import { generateToken } from "../../Helpers/jwt.js";




export class UserController {
    dao: any;

    constructor() {
        this.dao = new UserDao();
    }


    async signup(req: Request, res: Response) {
        try {
            const validatedBody = createUserSchema.parse(req.body);
            const hashedPassword = await bcrypt.hash(validatedBody.password, 10);

            const newUser = await this.dao.create({ ...validatedBody, password: hashedPassword });

            const userWithoutPassword = { ...newUser, password: undefined };

            const token = generateToken({ id: newUser.id, email: newUser.email });

            return ResponseHandler.created(res, { user: userWithoutPassword, token }, 'Usuario creado exitosamente y logueado',);
        }
        catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async signin(req: Request, res: Response) {
        try {
            const { email, password } = signinUserSchema.parse(req.body);
            const foundUser = await this.dao.getByEmail(email);
            if (!foundUser) {
                throw new NotFoundError('Usuario no encontrado');
            }
            const isPasswordValid = await bcrypt.compare(password, foundUser.password);

            if (!isPasswordValid) {
                throw new UnauthorizedError('Credenciales inválidas');
            }
            const token = generateToken({ id: foundUser.id, email: foundUser.email });
            const userWithoutPassword = { ...foundUser, password: undefined };
            return ResponseHandler.success(res, { user: userWithoutPassword, token }, 'Inicio de sesión exitoso');
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const user = (req as any).user;  // accedemos al payload del JWT que puso el middleware
            if (!user) {
                throw new UnauthorizedError("No se pudo obtener el perfil del usuario");
            }

            const foundUser = await this.dao.getByEmail(user.email);
            if (!foundUser) {
                throw new NotFoundError('Usuario no encontrado');
            }
            
            const userWithoutPassword = { ...foundUser, password: undefined };
            return ResponseHandler.success(res, userWithoutPassword, 'Perfil del usuario obtenido exitosamente');
        } catch (error) {
            return ErrorHandler.handle(error, res);
        }
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