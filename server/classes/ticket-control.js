const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; // para guardar los tikets totales del json
        this.ultimos4 = [];

        let data = require('../data/data.json');

        //console.log(data);
        if ( data.hoy === this.hoy ) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets; //cuando se recarga obtenemos la data guardada
            this.ultimos4 = data.ultimos4;

        }else { // si no es hoy se reinicia todo
            this.reiniciarConteo();
        }
    

    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;
    }
    
    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket( escritorio ) {

        if ( this.tickets.length === 0){ // verifico que hayan tikets pendientes para atender
            return 'No hay mas tickets';
        }

        let numeroTicket = this.tickets[0].numero; //obtengo el numero del ticket mayor
        this.tickets.shift(); // elimino el primer elemento 

        let atenderTicket = new Ticket(numeroTicket, escritorio); // creo el tiket que va a ser atendido

        this.ultimos4.unshift( atenderTicket ); // lo pone al tiket al inicio del arreglo

        if ( this.ultimos4.length > 4 ) { // verifico que solo exista solo 4 tickets en el arreglo
            this.ultimos4.splice(-1,1); // esto borra el ultmo elemento
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = []; // reiniciar el conteo
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }
    
    grabarArchivo() {
        
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
    
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json',jsonDataString);
    }






}

module.exports = {
    TicketControl
}