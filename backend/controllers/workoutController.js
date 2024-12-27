const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts= async(req,res)=>{
    const workouts = await Workout.find({}).sort({createsAt: -1})

    res.status(200).json(workouts)
}
// get a single workout
const getWorkout = async(req, res) => {
    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout'})
    }
    const workout= await Workout.findById(id)
    if (!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}
// create new workout
const createWorkout = async(req, res) =>{
    const{title, load, reps} = req.body

    let emptyFields =[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please enter all the fields', emptyFields})
    }
    // add doc to db
    try{
        const workout= await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
// delete a workout
 const deleteWorkout = async(req, res) => {
    const {id} = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout'})
    }
    const workout= await Workout.findOneAndDelete({_id: id})
    if (!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
 }
// update a workout
const updateWorkout = async(req, res) =>{
    const {id} = req.params; 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout'})
    }
     // Extract variables from the request body
     const { title, load, reps } = req.body;

     // Validate variables
     const errors = {};
     if (title && typeof title !== 'string') {
         errors.title = 'Title must be a string';
     }
     if (load && (typeof load !== 'number' || load < 0)) {
         errors.load = 'Load must be a non-negative number';
     }
     if (reps && (typeof reps !== 'number' || reps < 0)) {
         errors.reps = 'Reps must be a non-negative number';
     }
 
     // If there are validation errors, return them
     if (Object.keys(errors).length > 0) {
         return res.status(400).json({ error: 'Invalid input', details: errors });
     }
    try{
        const workout = await Workout.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            {new: true}
           
        );

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }
        res.status(200).json(workout);
    }catch(error){
        res.status(500).json({error:'An error happened'})
    }
}

module.exports={
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}