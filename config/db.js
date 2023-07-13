const mongoose = require("mongoose")
const dotenv=require("dotenv")
dotenv.config();

MONGO_URL=process.env.MONGO_URL;
const connectDB= async()=>{
    try{
const conn=await mongoose.connect(MONGO_URL);
console.log(`Database connected successfully`)
    }catch(err){
        console.log(`Error connecting to database: ${err}`)
    }
}
module.exports=connectDB;