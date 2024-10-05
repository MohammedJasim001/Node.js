const express = require('express')
const app = express()
app.use(express.json())

let users = [
    {
        id:1,
        name:"jasim",
        age:21
    },
    {
        id:2,
        name:"salman",
        age:20
    }
]


app.get('/users',(req,res)=>{
    res.status(200).send(users)
})
app.get('/users/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const user = users.find(us=>us.id === id)
    if(!user) res.status(404).send('user not found')
        res.status(200).send(user)
})
app.post('/users',(req,res)=>{
    const {name,age} = req.body
    const newUser = {
        id:users.length+1,
        name,
        age
    }
    users.push(newUser)
    res.status(201).send(newUser)
})
app.put('/users/:id',(req,res)=>{
    const {name,age} = req.body
    const id = parseInt(req.params.id)
    const user = users.find(us=>us.id == id)
    if(!user) res.status(404).send('User not find')
        user.name=name
        user.age = age
        res.status(200).send(user)
})
app.delete('/users/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const deleted = users.filter(us=>us.id !== id)
    users = deleted
    res.status(200).send('item deleted')
    
})
app.listen(3000)