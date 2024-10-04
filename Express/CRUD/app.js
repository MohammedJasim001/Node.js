const express=require('express');
const app=express()
app.use(express.json())

const products=[
    {
        id:1,
        name:'soap',
        discription:'good for health'
    },
    {
        id:2,
        name:'pant',
        discription:'good quality '
    }
]

app.get('/',(req,res)=>{
    res.send('welcome to home')
})

app.get('/products',(req,res)=>{
   res.status(201)
   res.send(products)
})

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  });


app.post('/products',(req,res)=>{
  const {name,discription}=req.body;
  const newproduct={
    id:products.length+1,
    name,
    discription
  }
  products.push(newproduct)
  res.status(201).json(newproduct)
})

app.put('/products/:id',(req,res)=>{
    const {name,discription}=req.body;
    const product=products.find((item)=>item.id===parseInt(req.params.id))
    if(!product)return res.status(404).json({message:'item not found'})
        product.name=name
        product.discription=discription
        res.status(200).json(product)
})

app.delete('/products/:id',(req,res)=>{
    const productIndex=products.findIndex((item)=>item.id===parseInt(req.params.id))
    if(productIndex===-1)return res.status(404).json({message:'item not found'})
    products.splice(productIndex,1)
    res.status(204).json(products)
    
})

app.listen(3000,()=>{
    console.log('your server runnig on the port 3000');
    
})