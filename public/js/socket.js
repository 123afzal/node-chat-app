/**
 * Created by Syed Afzal
 */
var socket = io();
socket.on('connect', function() {
    console.log("Connected to Server")

    // socket.emit('newEmail', {
    //     to: 'Waseem Asif',
    //     text: 'Ok, I will be there'
    // })

    // socket.emit('createMessage', {
    //     from: "Syed Afzal",
    //     text: "I am fine here"
    // })
});

socket.on('disconnect', function(){
    console.log('Disconnected from Server')
})

socket.on('newMessage', function (message) {
    console.log('New Message : ', message)
})

// socket.on('newEmail', function (res) {
//     console.log("New Email : ", res);
// })