const express = require("express")
const app = express()
const token = require('./tocken')
const validation = require('./validation')

app.use(application)

const middlwares = [token,validation] 

app.get('/register',middlwares,(req,res)=>{
    res.send("this is register page")
    console.log(`user registered`)
})

app.get('/',(req,res)=>{
    res.send('this is home page')
    console.log('home page running')
})

function application (req,res,next){
console.log(new Date())
next()
}

app.listen(4000,()=>{
    console.log('app running on port 4000')
})