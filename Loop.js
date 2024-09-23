// const fs = require('fs')



// process.nextTick(()=>{console.log('nexttick 1')
// Promise.resolve().then(()=>console.log('this inner promise of nexttick'))
// })

// Promise.resolve().then(()=>{
//     console.log('promise 1');
//     setImmediate(()=>console.log('this is setImmediate of promise 1'))
    
// })
// process.nextTick(()=>{
//     console.log('next Tick 3');
//     process.nextTick(()=>console.log('this is inner next tick'))
    
// })

// fs.readFile(__filename,()=>{
//     console.log('this is a read file');
    
// })

// setTimeout(()=>{
//      console.log('this is setTimeout 1');
//      Promise.resolve().then(()=>{
//         console.log('this is inner promise on setTime out')
//      })
//      setImmediate(()=>{
//         console.log("this is setImmediate inside the setTimeout 1");
        
//     })
// },0)
// process.nextTick(()=>console.log('nexttick 2'))

// Promise.resolve().then(()=>{
//     console.log('this is promise 2');
//     process.nextTick(()=>console.log("this is inner next tick of promise 2")
//     )
// })

// setImmediate(()=>{
//     console.log("this is setImmediate");
//     process.nextTick(()=>console.log("this is nextick of setImmdiate ")
//     )
    
// })

// setTimeout(()=>{
//     console.log('this is setTimeout 2');
//     process.nextTick(()=>console.log('this is inner next tick on settimeout'))
// },0)

const fs = require('fs')

setImmediate(()=>{
    console.log('this is setImmediate 1')
    process.nextTick(()=>console.log('this is nexttick inside the setimmediate 1'))
    Promise.resolve().then(()=>{
        console.log('this promise inside setImmediate')
    })
})
setTimeout(()=>{
    console.log('this is setTimeout 1');
    process.nextTick(()=>console.log('this nexttick inside the setTimeout 1'))
    
},1000)

const readableStream = fs.createReadStream(__filename)
readableStream.close()
readableStream.on("close",()=>{
    console.log('this is from readableStream close event callback')
})



