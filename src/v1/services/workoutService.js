const database = require("../../database/database")

const getAllWorkouts = () => {
    const allWorkouts = database.getAllWorkouts()
    return allWorkouts;
  };
  
  const getOneWorkout = () => {
    return;
  };
  
  const createNewWorkout = () => {
    return;
  };
  
  const updateOneWorkout = () => {
    return;
  };
  
  const deleteOneWorkout = () => {
    return;
  };
  
  module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
  };