const express=require('express');
const http=require('http');
const path=require('path');
const socketio=require('socket.io');
const formatMessage=require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers}=require('./utils/users');
const app=express();
const server=http.createServer(app);
const io=socketio(server);


//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

const bot='ChatChord Bot';
//Runs when a Client Connects
io.on('connection',socket=>{
  console.log('New Connection');
  
  //Listen for JoinRoom
  socket.on('joinRoom',({username,room})=>
  {
    //Join the Specified Room
    const user=userJoin(socket.id,username,room);
    socket.join(user.room);

    //Welcome Current User
    socket.emit('message',formatMessage(bot,'Welcome to ChatCord!'));

    //Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',formatMessage(bot,`${user.username} has joined the chat`));//Everyone expect the user that is connecting

    //Send Users and room info
    io.to(user.room).emit('roomUsers',{
      room:user.room,
      users:getRoomUsers(user.room)
    })
  })
  
  //Listen for Chat Message
  socket.on('chatMessage',(msg)=>
  {
    const user=getCurrentUser(socket.id);
    io.to(user.room).emit('message',formatMessage(user.username,msg))
  });


  //Runs when the client disconnects
  socket.on('disconnect',()=>
  {
    const user=userLeave(socket.id);
    if(user){
      io.to(user.room).emit('message',formatMessage(bot,`${user.username} has left the chat`))
    }

    //Send Users and room info
    io.to(user.room).emit('roomUsers',{
      room:user.room,
      users:getRoomUsers(user.room)
    })
    
  })

  

})

const PORT=3000 || process.env.PORT;
server .listen(PORT,()=>console.log(`Server running on Port ${PORT}`));