const express = require('express')
const mongoose = require('mongoose')
const Produt = require('./product')

mongoose.connect('mongodb://localhost:27017/products')
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err))

const app = express()
app.use(express.json())

app.post('/products',async(req,res)=>{
    try {
        const newProduct = new Produt(req.body)
        await newProduct.save()

        res.status(201).send(newProduct)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/products',async(req,res)=>{
    try {
        const products = await Produt.find()

        if(!products) return res.status(404).send('not products in this collection')
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        const product =await Produt.findById( req.params.id)
        if(!product) return res.status(404).send('product not found')
            res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/products/:id',async (req,res)=>{
    try {
        const product =await Produt.findByIdAndUpdate( req.params.id,req.body,{new:true})
        if(!product) return res.status(404).send('product not found')
            res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/products/:id',async(req,res)=>{
    try {
        const deleted =await Produt.findByIdAndDelete( req.params.id)
        if(!deleted) return res.status(404).send('not product found')
            res.status(200).send('item successfully deleted')
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(3000,()=>{
    console.log('server running port 3000')
})
