const exprss = require('express')
const app = exprss()


app.get('/names',(req,res)=>{
    const {name} = req.query
    res.send(`hello  ${name}`)
})
app.listen(3000,()=>{
    console.log('app running on port 3000')
})

