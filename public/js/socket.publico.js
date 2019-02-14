var socket = io(); //comando para establecer la coexion

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblExcritorio1 = $('#lblEscritorio1');
var lblExcritorio2 = $('#lblEscritorio2');
var lblExcritorio3 = $('#lblEscritorio3');
var lblExcritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1,lblTicket2,lblTicket3,lblTicket4];
var lblEscritorios = [lblExcritorio1,lblExcritorio2,lblExcritorio3,lblExcritorio4];


socket.on('estadoActual', function(data) {
    //console.log(data);
    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', function(data) {
    //console.log(data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(data.ultimos4);
});

function actualizaHTML( ultimos4 ){
    for( var i=0; i <= ultimos4.length -1; i++){
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio '+ ultimos4[i].escritorio);
    }
}