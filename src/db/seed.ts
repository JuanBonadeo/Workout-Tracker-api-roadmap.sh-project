import prisma from "./client.js";

async function main(): Promise<void> {
  console.log("🌱 Iniciando seed de la base de datos...");

  // Limpiar datos existentes
  await prisma.setLog.deleteMany();
  await prisma.workoutExerciseLog.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.routineExercise.deleteMany();
  await prisma.routine.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️ Datos existentes eliminados");

  // Crear usuarios
  const users = await prisma.user.createMany({
    data: [
      {
        email: "carlos.martinez@email.com",
        password: "$2b$10$hash1", // En producción usar bcrypt real
        firstName: "Carlos",
        lastName: "Martínez",
        age: 28,
        height: 175,
        weight: 80,
      },
      {
        email: "ana.rodriguez@email.com",
        password: "$2b$10$hash2",
        firstName: "Ana",
        lastName: "Rodríguez",
        age: 32,
        height: 165,
        weight: 60,
      },
      {
        email: "miguel.santos@email.com",
        password: "$2b$10$hash3",
        firstName: "Miguel",
        lastName: "Santos",
        age: 25,
        height: 180,
        weight: 85,
      },
      {
        email: "lucia.fernandez@email.com",
        password: "$2b$10$hash4",
        firstName: "Lucía",
        lastName: "Fernández",
        age: 29,
        height: 168,
        weight: 65,
      },
    ],
  });

  console.log("👥 Usuarios creados");

  // Crear ejercicios
  const exercises = await prisma.exercise.createMany({
    data: [
      // PECHO
      {
        name: "Press de Banca",
        description: "Ejercicio básico para desarrollo del pecho con barra",
        muscularGroup: "CHEST",
        difficulty: "INTERMEDIATE",
        category: "STRENGTH",
        equipment: ["BARBELL"],
      },
      {
        name: "Flexiones",
        description: "Ejercicio de peso corporal para pecho y brazos",
        muscularGroup: "CHEST",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["BODYWEIGHT"],
      },
      {
        name: "Press con Mancuernas",
        description: "Press de pecho con mancuernas para mayor rango de movimiento",
        muscularGroup: "CHEST",
        difficulty: "INTERMEDIATE",
        category: "STRENGTH",
        equipment: ["DUMBBELLS"],
      },
      {
        name: "Aperturas con Mancuernas",
        description: "Ejercicio de aislamiento para pecho",
        muscularGroup: "CHEST",
        difficulty: "INTERMEDIATE",
        category: "STRENGTH",
        equipment: ["DUMBBELLS"],
      },

      // ESPALDA
      {
        name: "Dominadas",
        description: "Ejercicio de tracción vertical para espalda y bíceps",
        muscularGroup: "BACK",
        difficulty: "INTERMEDIATE",
        category: "STRENGTH",
        equipment: ["BODYWEIGHT"],
      },
      {
        name: "Remo con Barra",
        description: "Ejercicio de tracción horizontal para espalda",
        muscularGroup: "BACK",
        difficulty: "INTERMEDIATE",
        category: "STRENGTH",
        equipment: ["BARBELL"],
      },
      {
        name: "Peso Muerto",
        description: "Ejercicio compuesto para espalda baja y piernas",
        muscularGroup: "BACK",
        difficulty: "ADVANCED",
        category: "STRENGTH",
        equipment: ["BARBELL"],
      },
      {
        name: "Remo con Mancuerna",
        description: "Remo unilateral con mancuerna",
        muscularGroup: "BACK",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["DUMBBELLS"],
      },

      // HOMBROS
      {
        name: "Press Militar",
        description: "Press de hombro de pie con barra",
        muscularGroup: "SHOULDERS",
        difficulty: "INTERMEDIATE",
        category: "STRENGTH",
        equipment: ["BARBELL"],
      },
      {
        name: "Elevaciones Laterales",
        description: "Ejercicio de aislamiento para deltoides lateral",
        muscularGroup: "SHOULDERS",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["DUMBBELLS"],
      },
      {
        name: "Press con Mancuernas Sentado",
        description: "Press de hombro sentado con mancuernas",
        muscularGroup: "SHOULDERS",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["DUMBBELLS"],
      },

      // BÍCEPS
      {
        name: "Curl de Bíceps",
        description: "Curl básico de bíceps con mancuernas",
        muscularGroup: "BICEPS",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["DUMBBELLS"],
      },
      {
        name: "Curl Martillo",
        description: "Curl con agarre neutro para bíceps y antebrazos",
        muscularGroup: "BICEPS",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["DUMBBELLS"],
      },

      // TRÍCEPS
      {
        name: "Press Francés",
        description: "Extensión de tríceps acostado",
        muscularGroup: "TRICEPS",
        difficulty: "INTERMEDIATE",
        category: "STRENGTH",
        equipment: ["DUMBBELLS"],
      },
      {
        name: "Fondos en Paralelas",
        description: "Ejercicio de peso corporal para tríceps y pecho",
        muscularGroup: "TRICEPS",
        difficulty: "INTERMEDIATE",
        category: "STRENGTH",
        equipment: ["BODYWEIGHT"],
      },

      // PIERNAS
      {
        name: "Sentadillas",
        description: "Ejercicio básico para cuádriceps y glúteos",
        muscularGroup: "QUADRICEPS",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["BODYWEIGHT", "BARBELL"],
      },
      {
        name: "Sentadilla con Barra",
        description: "Sentadilla con peso adicional",
        muscularGroup: "QUADRICEPS",
        difficulty: "INTERMEDIATE",
        category: "STRENGTH",
        equipment: ["BARBELL"],
      },
      {
        name: "Zancadas",
        description: "Ejercicio unilateral para piernas y glúteos",
        muscularGroup: "QUADRICEPS",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["BODYWEIGHT", "DUMBBELLS"],
      },
      {
        name: "Curl Femoral",
        description: "Ejercicio de aislamiento para isquiotibiales",
        muscularGroup: "HAMSTRINGS",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["MACHINES"],
      },
      {
        name: "Elevaciones de Gemelos",
        description: "Ejercicio para pantorrillas",
        muscularGroup: "CALVES",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["BODYWEIGHT", "DUMBBELLS"],
      },

      // CORE
      {
        name: "Plancha",
        description: "Ejercicio isométrico para core",
        muscularGroup: "CORE",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["BODYWEIGHT"],
      },
      {
        name: "Abdominales",
        description: "Crunch abdominal básico",
        muscularGroup: "CORE",
        difficulty: "BEGINNER",
        category: "STRENGTH",
        equipment: ["BODYWEIGHT"],
      },

      // CARDIO
      {
        name: "Burpees",
        description: "Ejercicio de cuerpo completo de alta intensidad",
        muscularGroup: "FULL_BODY",
        difficulty: "INTERMEDIATE",
        category: "CARDIO",
        equipment: ["BODYWEIGHT"],
      },
      {
        name: "Saltos de Tijera",
        description: "Ejercicio cardiovascular básico",
        muscularGroup: "FULL_BODY",
        difficulty: "BEGINNER",
        category: "CARDIO",
        equipment: ["BODYWEIGHT"],
      },
    ],
  });

  console.log("💪 Ejercicios creados");

  // Obtener los ejercicios creados para las rutinas
  const allExercises = await prisma.exercise.findMany();
  const allUsers = await prisma.user.findMany();

  // Función helper para encontrar ejercicios de forma segura
  const findExerciseByName = (name: string) => {
    const exercise = allExercises.find(e => e.name === name);
    if (!exercise) {
      throw new Error(`Ejercicio "${name}" no encontrado`);
    }
    return exercise;
  };

  // Crear rutinas
  const routine1 = await prisma.routine.create({
    data: {
      name: "Push (Empuje)",
      description: "Rutina enfocada en músculos de empuje: pecho, hombros y tríceps",
      aproxDuration: 75,
      difficulty: "INTERMEDIATE",
      category: "STRENGTH",
    },
  });

  const routine2 = await prisma.routine.create({
    data: {
      name: "Pull (Tirón)",
      description: "Rutina enfocada en músculos de tirón: espalda y bíceps",
      aproxDuration: 70,
      difficulty: "INTERMEDIATE",
      category: "STRENGTH",
    },
  });

  const routine3 = await prisma.routine.create({
    data: {
      name: "Piernas",
      description: "Rutina completa de tren inferior",
      aproxDuration: 80,
      difficulty: "INTERMEDIATE",
      category: "STRENGTH",
    },
  });

  const routine4 = await prisma.routine.create({
    data: {
      name: "Full Body Principiante",
      description: "Rutina de cuerpo completo para principiantes",
      aproxDuration: 60,
      difficulty: "BEGINNER",
      category: "STRENGTH",
    },
  });

  const routine5 = await prisma.routine.create({
    data: {
      name: "HIIT Cardio",
      description: "Entrenamiento de alta intensidad",
      aproxDuration: 30,
      difficulty: "INTERMEDIATE",
      category: "CARDIO",
    },
  });

  console.log("📋 Rutinas creadas");

  // Crear ejercicios para rutina Push
  await prisma.routineExercise.createMany({
    data: [
      {
        routineId: routine1.id,
        exerciseId: findExerciseByName("Press de Banca").id,
        rest: 120,
        setsPlanned: 4,
        repsPlanned: 8,
        weightPlanned: 80,
      },
      {
        routineId: routine1.id,
        exerciseId: findExerciseByName("Press con Mancuernas").id,
        rest: 90,
        setsPlanned: 3,
        repsPlanned: 10,
        weightPlanned: 30,
      },
      {
        routineId: routine1.id,
        exerciseId: findExerciseByName("Press Militar").id,
        rest: 120,
        setsPlanned: 4,
        repsPlanned: 8,
        weightPlanned: 50,
      },
      {
        routineId: routine1.id,
        exerciseId: findExerciseByName("Elevaciones Laterales").id,
        rest: 60,
        setsPlanned: 3,
        repsPlanned: 12,
        weightPlanned: 12,
      },
      {
        routineId: routine1.id,
        exerciseId: findExerciseByName("Press Francés").id,
        rest: 90,
        setsPlanned: 3,
        repsPlanned: 10,
        weightPlanned: 25,
      },
    ],
  });

  // Crear ejercicios para rutina Pull
  await prisma.routineExercise.createMany({
    data: [
      {
        routineId: routine2.id,
        exerciseId: findExerciseByName("Dominadas").id,
        rest: 120,
        setsPlanned: 4,
        repsPlanned: 6,
        weightPlanned: 0,
      },
      {
        routineId: routine2.id,
        exerciseId: findExerciseByName("Remo con Barra").id,
        rest: 120,
        setsPlanned: 4,
        repsPlanned: 8,
        weightPlanned: 70,
      },
      {
        routineId: routine2.id,
        exerciseId: findExerciseByName("Remo con Mancuerna").id,
        rest: 90,
        setsPlanned: 3,
        repsPlanned: 10,
        weightPlanned: 35,
      },
      {
        routineId: routine2.id,
        exerciseId: findExerciseByName("Curl de Bíceps").id,
        rest: 60,
        setsPlanned: 3,
        repsPlanned: 12,
        weightPlanned: 15,
      },
      {
        routineId: routine2.id,
        exerciseId: findExerciseByName("Curl Martillo").id,
        rest: 60,
        setsPlanned: 3,
        repsPlanned: 12,
        weightPlanned: 15,
      },
    ],
  });

  // Crear ejercicios para rutina Piernas
  await prisma.routineExercise.createMany({
    data: [
      {
        routineId: routine3.id,
        exerciseId: findExerciseByName("Sentadilla con Barra").id,
        rest: 180,
        setsPlanned: 4,
        repsPlanned: 8,
        weightPlanned: 100,
      },
      {
        routineId: routine3.id,
        exerciseId: findExerciseByName("Peso Muerto").id,
        rest: 180,
        setsPlanned: 4,
        repsPlanned: 6,
        weightPlanned: 120,
      },
      {
        routineId: routine3.id,
        exerciseId: findExerciseByName("Zancadas").id,
        rest: 90,
        setsPlanned: 3,
        repsPlanned: 12,
        weightPlanned: 20,
      },
      {
        routineId: routine3.id,
        exerciseId: findExerciseByName("Curl Femoral").id,
        rest: 90,
        setsPlanned: 3,
        repsPlanned: 12,
        weightPlanned: 40,
      },
      {
        routineId: routine3.id,
        exerciseId: findExerciseByName("Elevaciones de Gemelos").id,
        rest: 60,
        setsPlanned: 4,
        repsPlanned: 15,
        weightPlanned: 20,
      },
    ],
  });

  // Crear ejercicios para rutina Full Body
  await prisma.routineExercise.createMany({
    data: [
      {
        routineId: routine4.id,
        exerciseId: findExerciseByName("Sentadillas").id,
        rest: 90,
        setsPlanned: 3,
        repsPlanned: 12,
        weightPlanned: 0,
      },
      {
        routineId: routine4.id,
        exerciseId: findExerciseByName("Flexiones").id,
        rest: 90,
        setsPlanned: 3,
        repsPlanned: 10,
        weightPlanned: 0,
      },
      {
        routineId: routine4.id,
        exerciseId: findExerciseByName("Remo con Mancuerna").id,
        rest: 90,
        setsPlanned: 3,
        repsPlanned: 10,
        weightPlanned: 20,
      },
      {
        routineId: routine4.id,
        exerciseId: findExerciseByName("Press con Mancuernas Sentado").id,
        rest: 90,
        setsPlanned: 3,
        repsPlanned: 10,
        weightPlanned: 15,
      },
      {
        routineId: routine4.id,
        exerciseId: findExerciseByName("Plancha").id,
        rest: 60,
        setsPlanned: 3,
        repsPlanned: 30,
        weightPlanned: 0,
      },
    ],
  });

  // Crear ejercicios para rutina HIIT
  await prisma.routineExercise.createMany({
    data: [
      {
        routineId: routine5.id,
        exerciseId: findExerciseByName("Burpees").id,
        rest: 30,
        setsPlanned: 4,
        repsPlanned: 15,
        weightPlanned: 0,
      },
      {
        routineId: routine5.id,
        exerciseId: findExerciseByName("Saltos de Tijera").id,
        rest: 30,
        setsPlanned: 4,
        repsPlanned: 30,
        weightPlanned: 0,
      },
      {
        routineId: routine5.id,
        exerciseId: findExerciseByName("Flexiones").id,
        rest: 30,
        setsPlanned: 4,
        repsPlanned: 12,
        weightPlanned: 0,
      },
      {
        routineId: routine5.id,
        exerciseId: findExerciseByName("Sentadillas").id,
        rest: 30,
        setsPlanned: 4,
        repsPlanned: 20,
        weightPlanned: 0,
      },
    ],
  });

  console.log("🔗 Ejercicios asignados a rutinas");

  // Verificar que tenemos usuarios antes de continuar
  if (allUsers.length === 0) {
    throw new Error("No se encontraron usuarios para crear entrenamientos");
  }

  // Crear algunos entrenamientos registrados
  const workouts: any[] = [];
  
  // Workout 1 - Carlos hace Push
  const workout1 = await prisma.workout.create({
    data: {
      name: "Entrenamiento Push - Lunes",
      description: "Sesión de empuje enfocada en pecho y hombros",
      userId: allUsers[0]!.id, // Non-null assertion ya que verificamos arriba
      routineId: routine1.id,
      date: new Date('2024-07-28'),
      durationRegistered: 75,
    },
  });

  // Workout 2 - Ana hace Full Body
  const workout2 = await prisma.workout.create({
    data: {
      name: "Full Body - Martes",
      description: "Entrenamiento completo para principiante",
      userId: allUsers[1]!.id,
      routineId: routine4.id,
      date: new Date('2024-07-29'),
      durationRegistered: 65,
    },
  });

  // Workout 3 - Miguel hace Piernas
  const workout3 = await prisma.workout.create({
    data: {
      name: "Día de Piernas",
      description: "Entrenamiento intenso de tren inferior",
      userId: allUsers[2]!.id,
      routineId: routine3.id,
      date: new Date('2024-07-30'),
      durationRegistered: 85,
    },
  });

  console.log("🏋️ Entrenamientos creados");

  // Crear logs de ejercicios para workout1 (Push)
  const pushExercises = await prisma.routineExercise.findMany({
    where: { routineId: routine1.id },
    include: { exercise: true },
  });

  for (const routineEx of pushExercises) {
    const workoutExercise = await prisma.workoutExerciseLog.create({
      data: {
        workoutId: workout1.id,
        exerciseId: routineEx.exerciseId,
      },
    });

    // Crear sets para cada ejercicio
    const numSets = routineEx.setsPlanned ?? 3; // Valor por defecto si es null
    for (let setNum = 1; setNum <= numSets; setNum++) {
      const baseReps = routineEx.repsPlanned ?? 10;
      const baseWeight = routineEx.weightPlanned ?? 0;
      
      await prisma.setLog.create({
        data: {
          workoutExerciseId: workoutExercise.id,
          setNumber: setNum,
          reps: baseReps + Math.floor(Math.random() * 3) - 1, // Variación de ±1 rep
          weight: Math.max(0, baseWeight + Math.floor(Math.random() * 10) - 5), // Variación de ±5kg, mínimo 0
        },
      });
    }
  }

  // Crear logs para workout2 (Full Body)
  const fullBodyExercises = await prisma.routineExercise.findMany({
    where: { routineId: routine4.id },
    include: { exercise: true },
  });

  for (const routineEx of fullBodyExercises) {
    const workoutExercise = await prisma.workoutExerciseLog.create({
      data: {
        workoutId: workout2.id,
        exerciseId: routineEx.exerciseId,
      },
    });

    const numSets = routineEx.setsPlanned ?? 3;
    for (let setNum = 1; setNum <= numSets; setNum++) {
      const baseReps = routineEx.repsPlanned ?? 10;
      const baseWeight = routineEx.weightPlanned ?? 0;
      
      await prisma.setLog.create({
        data: {
          workoutExerciseId: workoutExercise.id,
          setNumber: setNum,
          reps: baseReps + Math.floor(Math.random() * 2),
          weight: Math.max(0, baseWeight + Math.floor(Math.random() * 5) - 2),
        },
      });
    }
  }

  // Crear logs para workout3 (Piernas)
  const legExercises = await prisma.routineExercise.findMany({
    where: { routineId: routine3.id },
    include: { exercise: true },
  });

  for (const routineEx of legExercises) {
    const workoutExercise = await prisma.workoutExerciseLog.create({
      data: {
        workoutId: workout3.id,
        exerciseId: routineEx.exerciseId,
      },
    });

    const numSets = routineEx.setsPlanned ?? 3;
    for (let setNum = 1; setNum <= numSets; setNum++) {
      const baseReps = routineEx.repsPlanned ?? 10;
      const baseWeight = routineEx.weightPlanned ?? 0;
      
      await prisma.setLog.create({
        data: {
          workoutExerciseId: workoutExercise.id,
          setNumber: setNum,
          reps: baseReps + Math.floor(Math.random() * 2) - 1,
          weight: Math.max(0, baseWeight + Math.floor(Math.random() * 10) - 5),
        },
      });
    }
  }

  console.log("📊 Logs de entrenamientos creados");

  console.log("✅ Seed completado exitosamente!");
  console.log(`
📊 Resumen de datos creados:
👥 Usuarios: 4
💪 Ejercicios: 23
📋 Rutinas: 5
🏋️ Entrenamientos registrados: 3
📈 Con sets y repeticiones detallados
  `);
}

main()
  .catch((e: Error) => {
    console.error("❌ Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });