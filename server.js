const express=require('express');
const http=require('http');
const path=require('path');
const socketio=require('socket.io');

const app=express();
const server=http.createServer(app);
const io=socketio(server);

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Runs when a Client Connects
io.on('connection',socket=>{
  console.log('New Connection');
  socket.emit('message','Welcome to ChatCord!')
})

const PORT=3000 || process.env.PORT;
server .listen(PORT,()=>console.log(`Server running on Port ${PORT}`));