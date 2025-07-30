import { Router } from "express";

export const router = Router();

import { WorkoutExerciseController } from "./workoutExercise.controller.js";

const controller = new WorkoutExerciseController();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getOne(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

// WorkouExercise Set

