import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();
import "colors"

export default async function connectDB(){
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URI as string)
        console.log(`mongoDB connected : ${conn.connection.host}`.cyan.underline)
    }catch(error){
        console.log("here",error);
        process.exit(1)
    }
}
    
