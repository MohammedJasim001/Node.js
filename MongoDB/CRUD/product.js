const mongoose = require('mongoose')

const productSchema =new mongoose.Schema({
    name:String,
    price:Number,
    model:String
})
const Produt = mongoose.model('Product',productSchema)

module.exports= Produt