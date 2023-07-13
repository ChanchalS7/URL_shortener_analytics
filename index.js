const express = require("express");
const path = require("path");
const connectDB= require("./config/db")
const urlRoute = require("./routes/url")
const URL = require("./models/url")
const app=express();
const PORT = 8080
app.set('view engine', "ejs");
app.set('views', path.resolve("./views"));
app.use(express.json())
app.get('/test',async (req,res)=>{
    const allUrls = await URL.find({});
return res.render('home',{
    urls:allUrls,
});
});
app.use("/",urlRoute);
connectDB();

app.listen(PORT,()=>

console.log(`Server started at PORT :${PORT}`));