// In src/database/database.js
const DB = require("./db.json");
const fs = require("fs");

// Retorna todos os exercicios
const getAllWorkouts = () => {
  try {
    return DB.workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

// Retorna um exercicios especifico
const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// Cria um exercicio
const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name '${newWorkout.name}' already exists`,
    };
  }

  try {
    DB.workouts.push(newWorkout);
    fs.writeFileSync("../src/database/db.json", JSON.stringify(DB, null, 2), {
      encoding: "utf-8",
    });
    return newWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
    
  }

};

// Atualiza um exercicio
const updateOneWorkout = (workoutId, changes) => {

  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
    
      if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    
    // Persistência no Banco Fake
    fs.writeFileSync("../src/database/db.json", JSON.stringify(DB, null, 2), {
      encoding: "utf-8",
    });
    return updatedWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// Deleta um exercicio
const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDeletion = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    DB.workouts.splice(indexForDeletion, 1);
    
    // Persistência no Banco Fake
    fs.writeFileSync("../src/database/db.json", JSON.stringify(DB, null, 2), {
      encoding: "utf-8",
    });
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};



module.exports = {
  getOneWorkout,
  getAllWorkouts,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
