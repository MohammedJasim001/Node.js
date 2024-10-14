import User from "./Model.js"


export const getUser = async(req,res)=>{
    try {
        const users =await User.find()
        if(!users) return res.status(404).send('not users in this collection')
            res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUserById = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).send('user not found this id')
            res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const postUser = async (req,res)=>{
    try {
        const newuser = new User(req.body)
            await newuser.save()
            res.status(201).send(newuser)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateUser = async (req,res)=>{
    try {
        const updated = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!updated)return res.status(404).send('user not find')
        res.status(200).send(updated)
    } catch (error) {
        res.status(500).send(error)
    }
 }

 export const deletUser = async (req,res)=>{
    try {
        const deleting =await User.findByIdAndDelete(req.params.id)
        if(!deleting) return res.status(404).send('user not found')
            res.status(200).send('itme successfully deleted')
    } catch (error) {
        res.status(500).send(error)
    }
 }