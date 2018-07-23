/**
 * Created by Syed Afzal
 */

//project dependies
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const publicPath = path.join(__dirname, '../public');
var server = http.createServer(app);
var io = socketIO(server);

//app models
const {generateMessage, generateLocationMessage} = require('./utils/messages');
const { isRealString } = require('./utils/validations');
const {Users} = require('./utils/users');
var users = new Users();

io.on('connection', (socket) => {
    console.log("User is connected to server");
    socket.on('disconnect', ()=>{

        // every time when user left the delete it from users and update the users list
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updatedUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat room.`))
        }
    });

    socket.on('createMessage',(res, callback)=>{
        console.log("Message from Client : ", res);
        let user = users.getUser(socket.id);

        if(user && isRealString(res.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, res.text));
        }
        callback();
    });

    socket.on('createLocationMessage', function (position) {
        console.log('Position object : ', position);

        let user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage('Admin', position.latitude, position.longitude));
        }
    });

    // io.emit() -> io.to('romm name').emit()
    // socket.broadcast.emit -> socket.broadcast.to('room name').emit
    // sokcet.emit

    socket.on('join', function (params, callback) {
        if(isRealString(params.name) && isRealString(params.room)){

            //user joined the chat room here and socket goes only to ther users which are in that room
            socket.join(params.room);

            //no user with this id;
            users.removeUser(socket.id);
            //users added on the list
            users.addUsers(socket.id, params.name, params.room);

            //now emit the event for fresh user list
            io.to(params.room).emit('updatedUserList', users.getUserList(params.room));

            socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat-App'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat`));
            callback();
        } else {
            return callback('Provide valid display name and room');
        }
    })
});

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log('Server is up on port : ', port)
});
