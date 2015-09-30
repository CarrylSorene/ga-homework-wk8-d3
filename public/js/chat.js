$(document).ready(function() {

  var socket = io('http://c9a35c50.ngrok.io');

  $('#chat-form').on('submit', function(event) {
    event.preventDefault();
    var inputContent = $('#chat-box').val();
    socket.emit('chat', { messageContent: inputContent })
  });

  

  socket.on('chat', function(incomingData) {
    console.log(incomingData.messageReceived.messageContent)
    $('#messages').prepend('<li>' + incomingData.messageReceived.messageContent + '</li>')
  });

})