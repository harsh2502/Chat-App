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
  
  //Welcome Current User
  socket.emit('message','Welcome to ChatCord!')

  //Broadcast when a user connects
  socket.broadcast.emit('message','A user has joined the chat');//Everyone expect the user that is connecting

  //Runs when the client disconnects
  socket.on('disconnect',()=>{
  io.emit('message','A user has left the chat')
  })

})

const PORT=3000 || process.env.PORT;
server .listen(PORT,()=>console.log(`Server running on Port ${PORT}`));