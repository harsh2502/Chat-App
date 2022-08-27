const socket=io();
const chatform=document.getElementById('chat-form');


socket.on('message',message=>{
  console.log(message);
  outputMessage(message);
});

//Message Submit
chatform.addEventListener('submit',(e)=>
{
  e.preventDefault();//Prevent the Default Behaviour
  
  //Get message text
  const msg=e.target.elements.msg.value;
  
  //Emitting a message to the server
  socket.emit('chatMessage',msg);
});