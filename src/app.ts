import express from 'express';
import { router as routerExercise} from './Exercise/exercise.routes.js';
import { router as routerRoutine } from './Routine/routine.routes.js';
import { router as routerRoutineExercises } from './RoutineExercises/routineExercises.routes.js';
import { router as routerUser } from './User/user.routes.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


// Routes
app.use('/routineExercises', routerRoutineExercises);
app.use('/exercises', routerExercise);
app.use('/routines', routerRoutine);
app.use('/users', routerUser);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Accede a la API en http://localhost:${PORT}`);
});
