const socket=io();
const chatform=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages')
const roomName=document.getElementById('room-name');
const userList=document.getElementById('users');
 

//Get Username and Room from URL
const {username,room}=Qs.parse(location.search,{
  ignoreQueryPrefix:true
});

console.log(username,room);

//Join ChatRoom
socket.emit('joinRoom',{username,room})


//Get Room and Users
socket.on('roomUsers',({room,users})=>{
  outputRoomName(room);
  outputUsers(users);
})


//Message from Server
socket.on('message',message=>{
  console.log(message);
  outputMessage(message);
  //Scroll Down
  chatMessages.scrollTop=chatMessages.scrollHeight;
});

//Message Submit
chatform.addEventListener('submit',(e)=>
{
  e.preventDefault();//Prevent the Default Behaviour
  
  //Get message text
  const msg=e.target.elements.msg.value;
  
  //Emitting a message to the server
  socket.emit('chatMessage',msg);

  //Clear Input
  e.target.elements.msg.value='';
  e.target.elements.msg.focus;
});

//Output Message to Dom
function outputMessage(message)
{
  const div=document.createElement('div');
  div.classList.add('message');
  div.innerHTML= `
  <p class="meta">${message.username} <span> ${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to Dom
function outputRoomName(room){
  roomName.innerText=room;
}

//Add users to Dom
function outputUsers(users) 
{
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}