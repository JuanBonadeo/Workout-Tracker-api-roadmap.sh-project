import { Router } from "express";

export const router = Router();

import { WorkoutExerciseController } from "./workoutExercise.controller.js";

const controller = new WorkoutExerciseController();

router.get('/user/:userId', (req, res) => controller.getAllByUserId(req, res));
router.get('/:id', (req, res) => controller.getOne(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

// WorkouExercise Set

