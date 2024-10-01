const express = require ('express')
const app = express()

app.get('/user/:id',(req,res)=>{
    const {id} = req.params
    res.send(`User ID:${id}`)

})


app.listen(4000,()=>{
    console.log('app running on port 4000')
})