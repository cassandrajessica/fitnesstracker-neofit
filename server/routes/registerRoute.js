import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// register new users
router.post("/", async (req, res) => {
    try {
        // this is for debugging purposes - remove later 
        console.log("request body: ", req.body);
        // check if email already exists
        const existingEmail = await User.findOne({ email: req.body.email });

        if (existingEmail) {
            return res.status(409).json({ message: "Email is already in use"});
        }

        // check if username exists
        const existingUsername = await User.findOne( { username: req.body.username });

        if (existingUsername) {
            return res.status(409).json({ message: "Username is already taken" });
        }

        // create the new user
        const newUser = new User ({
            name: {
                first: req.body.first,
                last: req.body.last
            },
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // save user
        await newUser.save();
        res.status(201).json({ message: "User successfully registered!" });
    } catch(error) {
        console.log("Error message: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;