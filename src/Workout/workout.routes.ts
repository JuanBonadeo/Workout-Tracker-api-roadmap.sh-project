import { Router } from "express";

export const router = Router();

import { WorkoutController } from "./workout.controller.js";

const controller = new WorkoutController();

router.get('/user/:userId', (req, res) => controller.getByUserId(req, res));

router.get('/', (req, res) => controller.getAll(req, res));

router.get('/:id', (req, res) => controller.getOne(req, res));

router.post('/', (req, res) => controller.create(req, res));

router.put('/:id', (req, res) => controller.update(req, res));

router.delete('/:id', (req, res) => controller.delete(req, res));

