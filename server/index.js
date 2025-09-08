import express from 'express';
import cors from 'cors';

//create express instance
const app = express();

//enable cors requests
app.use(cors());

const port = 3000;

// start server and listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})