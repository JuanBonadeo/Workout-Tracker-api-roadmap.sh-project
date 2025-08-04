
import { Router } from "express";
import { UserController } from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";



export const router = Router();

const controller = new UserController();

router.get('/', authMiddleware, (req, res) => controller.getAll(req, res));
router.put('/:id', authMiddleware, (req, res) => controller.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => controller.delete(req, res));
