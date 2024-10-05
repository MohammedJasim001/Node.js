const mongoose=require('mongoose')
const express= require('express')
const User=require('./user');
const { error } = require('console');

mongoose.connect('mongodb://localhost:27017/mydb')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



const app=express()
app.use(express.json());

app.post('/users',async(req,res)=>{
  try{
     const newuser=new User(req.body)
     await newuser.save();
     res.status(200).json(newuser)
  }catch(eror){
     res.status(404).json({messege:error.messege})
  }
})

app.get('/users',async(req,res)=>{
    try{
        const Users= await User.find()
        res.status(200).json(Users)
    }catch(error){
        res.status(404).json({messege:error.messege})
    }
})

app.get('/user/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user)return res.status(404).json({messege:'item not found'})
            res.status(200).json(user)
    }catch(error){
      res.status(404).json({messege:error.messege})
    }
})

app.put('/user/:id',async (req,res)=>{
    try{
         const updatedUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
         if(!updatedUser)return res.status(404).json({messge:'item not found'})
         res.status(200).json(updatedUser)
    }catch(error){
        res.status(404).json({messege:error.messege});
    }
   
})

app.patch('/user/:id',async(req,res)=>{
    try{
        const updatedItem=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!updatedItem)return res.status(404).json({messege:'item not found'})
            res.status(200).json(updatedItem)
    }catch(err){
      res.status(404).json(err.messege)
    }
})

app.delete('/user/:id',async(req,res)=>{
    try{
        const item=await User.findByIdAndDelete(req.params.id)
        if(!item)return res.status(404).json({messege:'item not found'})
    }catch(error){
       res.status(404).json({messege:error.messege})
     }
})

app.listen(3000,()=>{
    console.log('server running port ');
    
})