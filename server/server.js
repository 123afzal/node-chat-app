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
const {generateMessage} = require('./utils/messages')

io.on('connection', (socket) => {
    console.log("User is connected to server");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat-App'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user is just joined the Chat-App'))

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });

    socket.on('createMessage',(res)=>{
        console.log("Message from Client : ", res)
        io.emit('newMessage', generateMessage(res.from, res.text))
        // socket.broadcast.emit('newMessage', {
        //     from: res.from,
        //     text: res.text,
        //     createdAt: new Date().getTime()
        // })
    });

    // socket.emit('newMessage', {
    //     from: "Waeem Asif",
    //     text: "How are you?",
    //     createdAt: 12123
    // })
});

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log('Server is up on port : ', port)
})
