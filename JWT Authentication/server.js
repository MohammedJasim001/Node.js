require ('dotenv').config()
const express = require("express")
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(express.json())

const users = []

const posts = [
    {
        username:"Kyle",
        title:"post 1"
    },
    {
        username:"Jim",
        title:"post 2"
    }
]

app.get('/posts',authenticateToken,(req,res)=>{
    res.send(posts.filter(post=>post.username===req.user.name))
})

app.get('/users',(req,res)=>{
res.send(users)
})

app.post('/users' ,async (req,res)=>{
//     try{
//         const salt = await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(req.body.password,salt)
//         console.log(salt)
//         console.log(hashedPassword)
//         const user = {name: req.body.name, password:hashedPassword}

//         users.push(user)

//         res.status(201).send()
//     }
//    catch{
//     res.status(500).send()
//    }

    const username = req.body.username
    const user = {name:username}

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.send({accessToken:accessToken})

})

// app.post('/users/login',async (req,res)=>{
//     const user = users.find(user=>user.name==req.body.name)
//     if(!user){
//         return res.status(404).send('connot finde user')
//     }
//     try {
//         if(await bcrypt.compare(req.body.password,user.password)){
//             res.send('success')
//         }
//         else{
//             res.send('password not match')
//         }
//     } catch (error) {
//         res.status(504).send(error)
//     }
// })

function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}

app.listen(3000,()=>{
    console.log('app running on server 3000')
})