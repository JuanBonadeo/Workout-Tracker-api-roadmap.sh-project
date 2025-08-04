import z from "zod";

export const signinUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(100),
}).describe('Credenciales de inicio de sesión del usuario');

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    age: z.number().min(0).optional(),
    height: z.number().min(0).optional(),
    weight: z.number().min(0).optional(),
});
