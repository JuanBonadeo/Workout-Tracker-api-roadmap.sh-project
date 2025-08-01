
import { Router } from "express";
import { UserController } from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";



export const router = Router();

const controller = new UserController();

router.post('/signup', (req, res) => controller.signup(req, res));
router.post('/signin', (req, res) => controller.signin(req, res));

router.get("/profile", authMiddleware, controller.getProfile.bind(controller));