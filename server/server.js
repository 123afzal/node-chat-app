/**
 * Created by Syed Afzal
 */
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const app = express();

var server = http.createServer(app);
var io = socketIO(server)

io.on('connection', (socket) => {
    console.log("User is connected to server");

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to Chat-App',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user is joined the chat-app',
        createdAt: new Date().getTime()
    })

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    })

    socket.on('createMessage',(res)=>{
        console.log("Message from Client : ", res)
        io.emit('newMessage', {
            from: res.from,
            text: res.text,
            createdAt: new Date().getTime()
        })
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
