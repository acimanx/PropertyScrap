#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var http = require('http');

var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

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
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
  











// const fs = require('fs');
// const path = require('path');
// const {fork} = require('child_process');
// // const semver = require('semver')
// const version = require('./package').engines.node

// if (!semver.satisfies(process.version, version)) {
//   throw new Error(`The current node version ${process.version} does not satisfy the required version ${version} .`);
// }

// checkExistence();
// nodeForking()

// async function nodeForking() {
//     try {
//         let scripts = [
//             {path: path.resolve(__dirname, 'index.js')},
//             {path: path.resolve(__dirname, 'client', 'scripts', 'start.js')}
//     ]
//     let processes = [];

//     scripts.forEach(script => {
//         let runningScript = fork(script.path, script.args, script.options);


//        // Optionally attach event listeners to the script
//        runningScript.on('close', () => console.log('Time to die...'))
//        processes.push(runningScript);
//     });
//         }
//     catch (error) {
//         console.error(`FATAL: Failed to fork ${error}`);
//     }
// }
// async function checkExistence() {
// const files = {server:'server.js', client:'client.js'}
// for (const file in files) {
// await fs.access(file, fs.constants.F_OK, (err) => {
//     console.error(`Missing ${file} ${err}`);
//     process.exit(1);
//   });

// }
// }

