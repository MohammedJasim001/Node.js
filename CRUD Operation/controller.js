// const fs=require('fs')
// const http=require('http')
// const url=require('url')

// const readData=()=>{
//     const data=fs.readFileSync('utils.json')
//     return JSON.parse(data)
// }

// const writeData=(data)=>{
//   fs.writeFileSync('datas.json',JSON.stringify(data,null,2));
// }

// const server=http.createServer((req,res)=>{
//     const parsedurl=url.parse(req.url,true);
//     const path=parsedurl.pathname;
//     const method=req.method;
//     const id=parsedurl.query.id? parseInt(parsedurl.query.id):null;


//     if(method === 'GET'&& path==='/items'){
//         const data=readData();
//         res.statusCode=200;
//         res.end(JSON.stringify(data))
//     }
//     else if(method==='GET'&& path ==='/items'){
//         const data=readData()
//         const item= data.filter((item)=>item.id===id);
//         if(item){
//             res.statusCode=200;
//             res.end(JSON.stringify(item))
//         }
//     }

//     else if(method==='POST'&& path === '/items'){
        
//         let body='';
//         req.on('data',(chanks)=>{
//             body+=chanks.toString()
//         })
//         req.on('end',()=>{
//             const newdata=JSON.parse(body)
//             const data=readData();
//             newdata.id=data.length?data[data.length-1].id+1:1;
//             data.push(newdata)
//             writeData(data)
//             res.statusCode=201;
//             res.end(JSON.stringify(newdata))
//         })
        
//     }
//     else if(method==='DELETE'&& path ==='/items'){
//         const data=readData()
//         const item=data.filter((itm)=>itm.id!==id)
//         if(item.length!==data.length){
//             writeData(item);
//             res.statusCode=200;
//             res.end(JSON.stringify({messege:'item deleted '}))
//         }
//     }
//     else if (method==='PUT'&& path ==='/items'){
//         let body='';
//         req.on('data',(chanks)=>{
//            body+=chanks.toString()
//         })
//         req.on('end',()=>{
//             const updatedItem=JSON.parse(body)
//             const data=readData();
//             const index=data.findIndex((item)=>item.id===id)
//             if(index!==-1){
//                 data[index]={...data,...updatedItem};
//                 writeData(data)
//                 res.statusCode=200;
//                 res.end(JSON.stringify(data[index]))
//             }else{
//                 res.statusCode=404;
//                 res.end(JSON.stringify({messege:'item not foud'}))
//             }

//         })
//     }
//     else{
//         res.statusCode=404;
//         res.end(JSON.stringify({messege:'item not found'}))
//     }
// })

// server.listen(5000,()=>{
//     console.log('server is running on http://localhost:5000');
// })




const data = require('./data')

class Controller{
      async getTodos(){
        return new Promise((resolve,_)=>resolve(data))
      }

      async getTodo(id){
        return new Promise((resolve,reject)=>{
            let todo = data.find(todo =>todo.id === parseInt(id))
            if(todo){
                resolve(todo)
            }
            else{
                reject(`Todo with id ${id} not found`)
            }            
        })
      }

      async createTodo(todo){
        return new Promise((resolve,_)=>{
            let newTodo ={
                id:Math.floor(4+Math.random()*10),
                ...todo
            }
            resolve(newTodo)
        })
      }

      async updateTodo(id){
        return new Promise((resolve,reject)=>{
            let todo=data.find(todo=>todo.id===parseInt(id))
            if(!todo){
                reject(`No todo with id ${id} found`)
            }
            resolve(todo)  
        })
      }

      async deleteTodo(id){
        return new Promise((resolve,reject)=>{
            let todo = data.find(todo=>todo.id=== parseInt(id))
            if(!todo){
                reject(`Todo not find with id ${id}`)
            }
            resolve('Todo deleted successfully')
        })
      }

}   

module.exports = Controller