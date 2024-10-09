const express = require("express")
const app = express()

const router = express.Route()
app.use(express.json())
app.use(express.urlencoded())

app.use(abc)
router.get('/',(req,res)=>{
    res.send("This is home page")
})

app.post('/submit',(req,res)=>{
    const {name,email} = req.query
    res.end(`The name is:${name} and email is:${email}`)
})

app.listen(3000,()=>{
    console.log('server running on port 3000')
})

