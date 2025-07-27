import { Router } from "express";
import { RoutineExercisesController } from "./routineExercises.controller.js";


export const router = Router();

const controller = new RoutineExercisesController();

router.get('/routine/:routineId', (req, res) => controller.getByRoutineId(req, res));

router.get('/', (req, res) => controller.getAll(req, res));

router.get('/:id', (req, res) => controller.getOne(req, res));

router.post('/', (req, res) => controller.create(req, res));

router.put('/:id', (req, res) => controller.update(req, res));

router.delete('/:id', (req, res) => controller.delete(req, res));

