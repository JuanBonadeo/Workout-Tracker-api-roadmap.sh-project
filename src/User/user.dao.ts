import prisma from "../db/client.js";


export class UserDao  {
    
    async getByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }
    async getAll() {
        return await prisma.user.findMany({
        });
    }
    async create(data: any) {
        return await prisma.user.create({
            data
        });
    }
    async update(id: number, data: any) {
        return await prisma.user.update({
            where: { id },
            data
        });
    }
    async delete(id: number) {
        return await prisma.user.delete({
            where: { id }
        });
    }

}