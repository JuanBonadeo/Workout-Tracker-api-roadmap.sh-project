2
import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { AuthController } from "./auth.controller.js";



export const router = Router();

const controller = new AuthController();

router.post('/signup', (req, res) => controller.signup(req, res));
router.post('/signin', (req, res) => controller.signin(req, res));

router.get("/profile", authMiddleware, (req, res) => controller.getProfile(req, res));