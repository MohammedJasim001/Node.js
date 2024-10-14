import express from "express";
import mongoose from "mongoose";
import router from "./Router.js";

mongoose.connect('mongodb://localhost:27017/users')
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err))

const app = express()
app.use(express.json())
app.use('/api',router)

app.listen(3000,()=>{
    console.log('server running on port 3000')
})