import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import connectdb from './database/connection.js';
import registerRoute from './routes/registerRoute.js';
import authRoute from './routes/authRoute.js';

//create express instance
const app = express();

// parses JSON bodies
// accessible through req.body 
app.use(express.json());

// 2. Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

//enable cors requests
app.use(cors());

const port = process.env.PORT || 3000;

// database connection 
await connectdb();

// routes
app.use("/api/register", registerRoute);
app.use("/api/auth", authRoute);

// start server and listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})