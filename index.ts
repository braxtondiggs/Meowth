'use strict';
import * as debug from 'debug';
import * as http from 'http';
import App from './src/app';

const server = http.createServer(App);
const port = normalizePort(process.env.PORT || 3000);

App.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
  // tslint:disable-next-line no-shadowed-variable
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr ? addr.port : port}`;
  debug(`Listening on ${bind}`);
  console.log(`Listening on ${bind}`);
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

exports = module.exports = App;
