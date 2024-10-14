import express from 'express'

const router = express.Router()
const app = express()
app.use(express.json())

let users = [
    {
        id:1,
        name:'jasim',
        age:21
    },
    {
        id:2,
        name:"salman",
        age:19
    }
]

router.get('/users',(req,res)=>{
    res.status(200).send(users)
})
router.get('/users/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const user = users.find((e)=>e.id===id)
    if(!user) return res.status(404).send('user not found')
        res.status(200).send(user)
})
router.post('/users/new',(req,res)=>{
    const {name,age}=req.body
    const newUser = {
        id:users.length+1,
        name,
        age
    }
    users.push(newUser)

    res.status(201).send(newUser)
})

router.put('/users/:id',(req,res)=>{
    const {name,age} = req.body
    const id = parseInt(req.params.id)
    const user = users.find((e)=>e.id === id)
    if(!user) return res.status(404).send('not user found')
         user.name = name
        user.age = age
        res.status(200).send(user)
})

router.delete('/users/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const user = users.find((e)=>e.id == id)
    const deleted = users.filter((e)=>e.id!==id)
    if(!user) return res.status(404).send('user not found')
    users = deleted
    res.status(200).send('itme successfully deleted')

})

app.use('/api',router)

app.listen(3000,()=>{
    console.log('server running on port 3000')
})