const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const secretKey = 'jjjilll'
const users = [
    {
        name:'jasim',
        password:'password111'
    },
    {
        name:'salman',
        password:'password112'
    }
]

app.post('/login',(req,res)=>{
    const {name,password} = req.body
    const user = users.find(e=>e.name === name&&e.password === password)
    if(!user) return res.status(404).send('user not found')
    const token = jwt.sign({name:user.name,password:user.password},secretKey,)
res.status(200).send(token)

})
app.listen(3000)