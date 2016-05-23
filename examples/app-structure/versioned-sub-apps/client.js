const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');

const socket = io('http://localhost:3030/');

const app = feathers().configure(socketio(socket));

// Get the message service that uses a websocket connection
const messageServiceV1 = app.service('/api/v1/message');
const messageServiceV2 = app.service('/api/v2/messages');

messageServiceV1.on('created', message => console.log('Received a API V1 message', message));
messageServiceV2.on('created', message => console.log('Received a API V2 message', message));

console.log('Feathers client running');