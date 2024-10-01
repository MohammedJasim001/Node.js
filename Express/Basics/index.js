const express = require("express")
const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("This is home page")
})

app.post('/submit',(req,res)=>{
    const {name,email} = req.body
    res.end(`The name is:${name} and email is:${email}`)
})

app.listen(3000,()=>{
    console.log('server running on port 3000')
})