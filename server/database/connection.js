import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Succesfully connected to MongoDB");
    } catch(error) {
        console.log(error, "Trouble connecting to Mongo");
    } finally {
        await mongoose.disconnect();
    }
}

export default connectdb;