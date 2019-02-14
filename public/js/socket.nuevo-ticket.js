

var socket = io(); //comando para establecer la coexion

var label = $('#lblNuevoTicket'); //hacemos la referencia al label por que la referenciamos muchas veces

socket.on('connect', function() {
    console.log('Conectado al servidor.....web');
});

socket.on('disconnect', function() {
    console.log('perdimos la connexion.....web');
});



$('button').on('click', function() {
    // console.log('click');
    socket.emit('siguienteTicket', null , function(siguienteTicket){ //null por que no se le manda ningun parametro pero si le mandamos un callback 
      label.text(siguienteTicket);                                   // para que la ejecute cuando termine               
    });
});

socket.on('estadoActual', ( resp ) => { 
    console.log(resp);
    label.text(resp.actual);
});