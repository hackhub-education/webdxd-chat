/**
 * Created by yanhong on 2016-09-10.
 */
var socket = io();

$('form').submit(function(){
    socket.emit('chat message', username + ': ' + $('#m').val());
    $('#m').val('');
    return false;
});

socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});