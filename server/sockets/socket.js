const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => { // la data por el momento es null , pero el callback si lo tenemos y lo ejecutaremos
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {  // ponemos el estado actual al refrescar la pantalla
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {  // en data vendran el escritorio o algo que quiera verificar
        if( !data.escritorio ) { // si no viene el escritorio se devuelve ese mensaje
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTiket = ticketControl.atenderTicket( data.escritorio );

        callback(atenderTiket); // le mando all callback del evento atenderTicket 

        // actualizar / notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ultimos4', {  //usamos broadcast para enviar a todos los que estan escuchando
            ultimos4: ticketControl.getUltimos4()
        });
    })
    

});