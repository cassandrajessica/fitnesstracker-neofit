import express from 'express';
import Workout from '../models/Workout.js';

const router = express.Router();

// add a new workout 
router.post("/add", async (req, res) => {
    try {
        // creating workout 
        const newWorkout = new Workout ({
            title: req.body.title,
            exercise: [{
                type: req.body.type,
                sets: req.body.sets,
                reps: req.body.reps,
                weights: req.body.weights,
                caloriesBurned: req.body.caloriesBurned
            }],
            duration: req.body.duration
        });

        // save workout
        await newWorkout.save();
        res.status(201).json({ message: "Workout succesfully added!" });
    } catch (error) {
        console.log("Error message: ", error.message);
        res.status(500).json( { message: "Server error or invalid request"});
    }
});

export default router;