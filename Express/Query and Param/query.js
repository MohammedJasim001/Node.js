const exprss = require('express')
const app = exprss()


app.get('/names',(req,res)=>{
    const {name,age} = req.query
    res.send(`${name} is ${age} year old`)
})
app.listen(3000,()=>{
    console.log('app running on port 3000')
})

