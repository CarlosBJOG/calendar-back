const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.paths = {
            auth: '/api/auth',   
            events: '/api/events'
        }

        //conecar a bd
        this.dbConnect();
        // Middlewares
        this.middlewares();

        //rutas
        this.routes();

       
    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }


    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.events, require('../routes/events'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.info('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports =  Server;