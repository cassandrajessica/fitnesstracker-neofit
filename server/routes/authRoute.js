import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// authenticate users for login 
router.post("/", async (req, res) => {
    try{
        // check if email is registered 
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials. Please check your email and password" });
        }

        // Compare passwords 
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if(!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials. Please check your email and password" });
        }

        // generate jsonwebtoken
        const token = jwt.sign({ email: user.email }, process.env.TOKEN);
        res.status(200).json({ message: "Login succesful!", token });
    }catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;