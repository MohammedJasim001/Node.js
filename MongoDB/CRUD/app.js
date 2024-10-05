const mongoose = require('mongoose')
const express = require ('express')
const Product = require('./product')

mongoose.connect('mongodb://localhost:27017/products')
.then(()=>console.log('connected'))
.catch((err)=>console.log(err))

const app = express()

app.use(express.json())

app.post('/products',async (req,res)=>{
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(201).json(newProduct)
        
    } catch (error) {
        res.status(404).send(err)
    }
    

})

app.get('/products',async(req,res)=>{
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        const product =await Product.findById(req.params.id)
        if(!product) return res.status(404).send('item not found')
            res.status(200).json(product)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/products/:id',async(req,res)=>{
    try {
        const updatedProduct =await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updatedProduct) return res.status(404).send('item not found')
            res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500).send(error)
    }
})


app.delete('/products/:id',async(req,res)=>{
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id)
        if(!deleted) return res.status(404).send('item not found')
            res.status(200).send('item successfully removed')
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(3000,()=>{
    console.log('serving running on port 3000')
})