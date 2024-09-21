const http = require('http')
const url = require('url')

const server = http.createServer((req,res)=>{

    res.setHeader('Location','www.map.smartherd.com/index')
    res.setHeader('X-Foo','bar')
    res.writeHead(200,{'Content-Type':'text/html',"x":'y'})

    const querydata = url.parse(req.url,true).query;
    const msg = querydata.name+ " is"+ querydata.age + 'year old'

    // res.write(req.url)
    res.write(msg)
    res.end()
})
server.listen(3000,()=>{
    console.log('hshshshs');
    
})