const emitEvent = require('events')

const emittin = new emitEvent()

emittin.on('ordering',(item)=>{
    console.log(`ordering some ${item}`);
    
})
emittin.on('ordering',(item1,item2,item3)=>{
    console.log(`i eate some ${item2} and ${item3}` );
    
})

emittin.emit('ordering','biriyani','porotta','fried rice')
