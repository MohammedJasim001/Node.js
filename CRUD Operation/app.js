const http = require('http')
const Todo = require('./controller')
const {getReqData}= require("./utils")

const server = http.createServer(async(req,res)=>{
    if(req.url==='/api/todos' && req.method === 'GET'){
        const todos = await new Todo().getTodos()
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(todos))
    }
    else if(req.url.match(/\/api\/todos\/([0-9]+)/)&& req/method==='GET'){
        try{
        const id = req.url.split("/")[3]
        const todo = await new Todo().getTodo(id)
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(todo))
        }catch(err){
            res.writeHead(404,{'Content-Type':'application/json'})
            res.end(JSON.stringify({message:err}))
        }
    }
    else if(req.url.match(/\/api\/todos\/([0-9]+)/)&& req/method==='DELETE'){
        try{
        const id = req.url.split("/")[3]
        const message = await new Todo().deleteTodo(id)
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(message))
        }catch(err){
            res.writeHead(404,{'Content-Type':'application/json'})
            res.end(JSON.stringify({message:err}))
        }
    }
    else if(req.url.match(/\/api\/todos\/([0-9]+)/)&& req/method==='PUT'){
        try{
        const id = req.url.split("/")[3]
        const updated_todo = await new Todo().updateTodo(id)
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(updated_todo))
        }catch(err){
            res.writeHead(404,{'Content-Type':'application/json'})
            res.end(JSON.stringify({message:err}))
        }
    } 
    else if(req.url === '/api/todos'&& req/method==='POST'){
        try{
        
        const todo_data = await getReqData(req)
        let todo = await new Todo().createTodo(JSON.parse(todo_data))
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(todo))
        }catch(err){
            res.writeHead(404,{'Content-Type':'application/json'})
            res.end(JSON.stringify({message:err}))
        }
    } 
    else{
        res.writeHead(404,{'Content-Type':'application/json'})
        res.end(JSON.stringify({message:"Route not found"}))
    }
})

server.listen(3000,()=>{
    console.log('the port is running in 3000')
})