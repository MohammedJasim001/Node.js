import express from 'express'
import mongoose from 'mongoose'
import Product from './product.js'

const router = express.Router()
const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/products')
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err))

router.post('/products',async(req,res)=>{
    try {
        const newProduct = new Product(req.body) 
        await newProduct.save()
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/products',async(req,res)=>{
    try {
        const products = await Product.find()
        res.status(200).send(products)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/products/:id',async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
    if(!product) return res.status(404).send('item not found')
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/products/:id',async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!product) return res.status(404).send('item not found')
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send(error)
        }
})

router.delete('/products/:id',async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product) return res.status(404).send('item not found')
            res.status(200).send('item successfully deleted')
        } catch (error) {
            res.status(500).send(error)
        }
})

app.use('/api',router)

app.listen(3000,()=>{
    console.log('server runnign on port 3000')
})



