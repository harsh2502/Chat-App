const socket=io();
const chatform=document.getElementById('chat-form');

//Message from Server
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

//Output Message to Dom
function outputMessage(message)
{
  const div=document.createElement('div');
  div.classList.add('message');
  div.innerHTML= `
  <p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    ${message}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}