const http = require('http')

const fs = require('fs')

const server = http.createServer((req,res)=>{
  //json
    // const person={
    //     name:'jajaja',
    //     age:40
    // } 
    // res.writeHead(200,{'Content-Type':'application/json'})
    // res.write(JSON.stringify(person))

  //htnl  
    // const html= fs.readFileSync("http.html",'utf-8')
    // res.write(html)
    // res.end()

    fs.createReadStream(__dirname+"/http.html").pipe(res)
})

server.listen(3000,()=>{
    console.log('hihihihi');
    
})