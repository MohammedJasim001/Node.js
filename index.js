const fs = require('fs')

const file = fs.readFileSync('file.txt','utf-8')
console.log(file)

fs.readFile('file.txt','utf-8',(err,data)=>{
    if(err) throw err
    console.log(data);
    
})

fs.writeFileSync('hello.txt', 'heeeeelllllo')

fs.writeFile('hi.txt','hahahahaha',(err)=>{
    if(err) throw err
    console.log('new one added');
})

fs.unlink('hello.txt',(err)=>{
    if(err) throw err
    console.log('item removed');
    
})

fs.appendFile('hi.txt',' added new apppend',()=>{
    
})