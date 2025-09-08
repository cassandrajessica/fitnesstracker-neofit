import express from 'express';
import cors from 'cors';
import connectdb from './database/connection.js';

//create express instance
const app = express();

//enable cors requests
app.use(cors());

const port = 3000;

connectdb();

// start server and listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})