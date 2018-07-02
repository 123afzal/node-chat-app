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

io.on('connection', (socket) => {
    console.log("User is connected to server");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat-App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user is just joined the Chat-App'));

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
    })
});

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log('Server is up on port : ', port)
});
