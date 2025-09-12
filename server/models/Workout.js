import mongoose from 'mongoose';

const { Schema } = mongoose;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    exercise: [{
        type: {
            type: String,
            required: true,
            enum: ["strength", "cardio"]
        },
        sets: {
            type: Number, 
            required: function() { return this.type === "strength" }
        },
        reps: {
            type: Number,
            required: function() { return this.type === "strength" }
        },
        weights: {
            type: Number,
            required: function() { return this.type === "strength" }
        },
        caloriesBurned: {
            type: Number
        }
    }],
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout; 
