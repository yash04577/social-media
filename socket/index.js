const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require("cors");
const PORT = process.env.PORT || 3001

app.use(cors());

let activeUsers = [];


io.on('connection', (socket) => {
  console.log("a user connected");
  
  socket.on('new-user', (userId)=>{

    if(!activeUsers.some((user) => user.userId === userId)){
      activeUsers.push({socketId:socket.id, userId:userId});
    }
    console.log(`${userId} joined`)
    console.log("aciveUsers ", activeUsers)
  })

  io.emit('user-list', JSON.stringify(activeUsers));


  socket.on('message', (message)=>{

    console.log(message)
    const index = activeUsers.findIndex((user)=>user.userId == message.receverId);
    if(index !== -1){
      io.to(activeUsers[index].socketId).emit('get-message', message);
      console.log("send ", message)
    }
  })

// /

  socket.on('disconnect', ()=>{
    console.log("a user disconected");

    const index = activeUsers.findIndex((user) => user.socketId === socket.id);
    if (index !== -1) {
      const userId = activeUsers[index].userId;
      activeUsers.splice(index, 1);
      console.log(`${userId} has left the chat`);

      // Emit a user list event to all clients
      io.emit('user-list', activeUsers);
    }

    console.log("aciveUsers ", activeUsers)
  })
});




http.listen(PORT, () => {
  console.log('Server listening on port 3001');
});
