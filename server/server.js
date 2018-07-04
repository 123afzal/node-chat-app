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

io.on('connection', (socket) => {
    console.log("User is connected to server");
    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });

    socket.on('createMessage',(res, callback)=>{
        console.log("Message from Client : ", res);
        io.emit('newMessage', generateMessage(res.from, res.text));
        callback();
    });

    socket.on('createLocationMessage', function (position) {
        io.emit('newLocationMessage', generateLocationMessage('Admin', position.latitude, position.longitude));
    });

    // io.emit() -> io.to('romm name').emit()
    // socket.broadcast.emit -> socket.broadcast.to('room name').emit
    // sokcet.emit

    socket.on('join', function (params, callback) {
        if(isRealString(params.name) && isRealString(params.room)){
            socket.join(params.room);
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat-App'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat`));
            callback();
        } else {
            callback('Provide valid display name and room');
        }
    })
});

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log('Server is up on port : ', port)
});
