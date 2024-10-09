let products = require("../Model/productModel")

exports.getProduct = (req,res)=>{
    res.status(200).json(products)
}
exports.getProductById = (req,res)=>{
    const id = parseInt(req.params.id)
    const product = products.find(item=>item.id === id)
    if(!product) return res.status(404).send('item not found')
        res.status(200).json(product)
}
exports.postProduct = (req,res)=>{
    const {name,price,model} = req.body
    const newProduct = {
        id:products.length+1,
        name,
        price,
        model
    }
    products.push(newProduct)
     res.status(201).send(newProduct)
}
exports.updateProduct = (req,res)=>{
    const {name,price,model} = req.body
    const id = parseInt(req.params.id)
    const updated = products.find(item =>item.id == id)
    if(!updated) return res.status(404).send('item not found')
    updated.name= name
    updated.price = price
    updated.model = model
        res.status(200).send(updated)

}
exports.deleteProduct = (req,res)=>{
    const id = parseInt(req.params.id)
    const deleted = products.filter(item => item.id !== id)
    products = deleted

    res.status(200).send('item successfully deleted')

}