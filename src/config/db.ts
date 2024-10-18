import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectDB=async()=>{
    console.log(process.env.MONGODB_URI);
    return mongoose.connect(process.env.MONGODB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true });
}
console.log('MONGODB_URI:', process.env.MONGODB_URI);


export default connectDB;