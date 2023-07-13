const express = require("express");
const connectDB= require("./config/db")
const urlRoute = require("./routes/url")
const URL = require("./models/url")
const app=express();
const PORT = 8080

app.use(express.json())
app.use("/",urlRoute);
connectDB();

app.listen(PORT,()=>console.log(`Server started at PORT :${PORT}`))