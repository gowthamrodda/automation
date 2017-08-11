const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('colors');
const path = require('path');
const http = require('http');
const routes = require('./api');
const config = require('./access/config');
const mongo = require('./access/mongo');
const fs = require('fs');
const async = require('async');
const debug = require('debug');

app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

new Main();

/**
 * @constructor
 */
function Main() {

    // port
    let configPort = (config.server || {}).port || null;
    let port = normalizePort(process.env.PORT || configPort || '4000');
    app.set('port', port);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/api', routes);

    console.log('starting mongodb');
    mongo
        .open()
        .then(() => {
            this.server = http.createServer(app);
            this.server.listen(port);
            this.server.on('error', onError.bind(this));
            this.server.on('listening', onListening.bind(this));

        })
        .catch((err) => {
            console.log('Unable to start server due to MonoDb initialization error'.red)
            console.error(err);
        });
}

Main.prototype.onError = onError;
Main.prototype.onListening = onListening;
Main.prototype.normalizePort = normalizePort;

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`.red);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`.red);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
    var addr = this.server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`...server started on ${bind} with NODE_ENV: ${config.NODE_ENV}`.green);
    debug('Listening on ' + bind);
}
