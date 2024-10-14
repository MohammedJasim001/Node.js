import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())

const users = []
const secretKey = 'asdfasdf'

app.post('/register',async(req,res)=>{
    const {name,password,role} = req.body
    
    const existingUser = users.find((e)=>e.name=== name)

    if(existingUser) return res.status(404).send('user already exist')

        const salt = 10
        const hashedPassword =await bcrypt.hash(password,salt)

        const newUser = {name,password:hashedPassword,role:role||'user'}
        users.push(newUser)

        res.status(201).send(newUser)
})

app.post('/login',async(req,res)=>{
    const {name,password} = req.body
    const user = users.find((e)=>e.name==name)
    if(!user) return res.status(404).send('user not found')

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid) return res.status(404).send('incorrect password')

        const token = jwt.sign({name:user.name,role:user.role},secretKey)
        res.status(201).send(token)

})

const middleware = (req,res,next)=>{
    const headr = req.headers["authorization"]
    
    const token = headr&&headr.split(' ')[1]

    if(!token) res.status(404).send('you dindnt have token')
        jwt.verify(token,secretKey,(err,user)=>{
            if(err) {
               return res.status(500).send('somthing wrong to verify')
            }
            req.user = user
            next()
        })
}

app.get('/registered',middleware,(req,res)=>{
    res.status(200).send(`Hello ${req.user.name} , You are welcome`)
})

app.get('/admin',middleware,(req,res)=>{
    if(req.user.role!=='admin'){
        res.status(404).send('You are not a admin')
    }
    res.status(200).send('welcome admin')
})

app.listen(4000,()=>{
    console.log('server running on port 4000')
})