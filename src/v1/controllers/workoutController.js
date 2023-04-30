const workoutService = require("../services/workoutService");
const database = require("../../database/database");
const { v4: uuid } = require("uuid");

const getAllWorkouts = (req, res) => {
  const { mode } = req.query;
  try {
    const allWorkouts = database.getAllWorkouts({mode});
    res.send({ status: "OK", data: allWorkouts });
  } catch (error) {
    res
    .status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || "An error have ocourred" } });
  }

};

const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    return res.status(404).send({ message: "Parameter ':workoutId' can not be empty" });
  }
  const workout = database.getOneWorkout(workoutId);
  res.send({ status: "OK", data: workout });
};

const createNewWorkout = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: "FAILED",
      error:
        "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
    });
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  try {
    const workoutToInsert = {
      ...newWorkout,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    const createdWorkout = database.createNewWorkout(workoutToInsert);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
    // Captura o erro que o service lança, trata e exibe a mensagem.
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;


  if (!workoutId) {
    return res.status(404).send({ message: "Parameter ':workoutId' can not be empty" });
  }

  try {
    const updatedWorkout = database.updateOneWorkout(workoutId, body);
    res.send({ status: "OK", data: updatedWorkout });
  } catch (error) {
    res
    .status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }

};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    return res.status(404).send({ message: "Parameter ':workoutId' can not be empty" });
  }
  try {
    database.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }

};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
