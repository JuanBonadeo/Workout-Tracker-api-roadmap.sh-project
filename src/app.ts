import express from 'express';
import { router as routerExercise} from './modules/Exercise/exercise.routes.js';
import { router as routerRoutine } from './modules/Routine/routine.routes.js';
import { router as routerRoutineExercises } from './modules/RoutineExercises/routineExercises.routes.js';
import { router as routerUser } from './modules/User/user.routes.js';
import { router as routerWorkout } from './modules/Workout/workout.routes.js';
import { router as routerWorkoutExercise } from './modules/WorkoutExerciseLog/workoutExercise.routes.js';
import { router as routerSetLog } from './modules/SetLog/setLog.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/routineExercises', routerRoutineExercises);
app.use('/exercises', routerExercise);
app.use('/routines', routerRoutine);
app.use('/users', routerUser);
app.use('/workouts', authMiddleware, routerWorkout);
app.use('/workoutExercises', authMiddleware, routerWorkoutExercise);
app.use('/setLogs', authMiddleware, routerSetLog);

  
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Accede a la API en http://localhost:${PORT}`);
});
