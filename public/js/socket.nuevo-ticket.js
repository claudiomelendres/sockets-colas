

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor.....web');
});

socket.on('disconnect', function() {
    console.log('perdimos la connexion.....web');
});



$('button').on('click', function() {
    // console.log('click');
    socket.emit('siguienteTicket', null , function(siguienteTicket){
      label.text(siguienteTicket);  
    });
})