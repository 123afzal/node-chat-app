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
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
       text: message.text,
       from: message.from,
       createdAt: formattedTime,
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    jQuery('#messages').append(html);

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

