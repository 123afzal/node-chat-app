/**
 * Created by Syed Afzal
 */
var socket = io();
socket.on('connect', function() {
    console.log("Connected to Server")
});

socket.on('disconnect', function(){
    console.log('Disconnected from Server')
});

socket.on('newMessage', function (message) {
    console.log('New Message : ', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} : `);

    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    })
});

let locationButton  = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert("Your browser doesn't support geolocation");
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function () {
            locationButton.removeAttr('disabled').text('Send location');
            return alert('Unable to fetch location');
        })
    })
});

