const express = require('express')
const router = require('./Routers/router')
const app = express()


app.use(express.json())
app.use('/products',router)


app.listen(4000,()=>{
    console.log('server running on port 4000')
})
