const EventEmitter = require('events');
const emitter = new EventEmitter();
const fs = require('fs');

emitter.on('start', ()=>{
    console.log('Application Started!');
});

emitter.on('data', (data)=>{
    console.log(`Data Received:`, data);
});

emitter.on('error', (error)=> {
    console.log(`Error Occured: ${error}`)
})


emitter.emit('start');
emitter.emit('data' ,{name:'John Doe', age: 25 });
emitter.emit('error', 'Something went wrong');      