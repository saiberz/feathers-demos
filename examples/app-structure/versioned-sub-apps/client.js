const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');

const socket = io('http://localhost:3030/');

const app = feathers().configure(socketio(socket));

// Get the message service that uses a websocket connection
const messageServiceV1 = app.service('/api/v1/messages');
const messageServiceV2 = app.service('/api/v2/messages');
const messageService = app.service('messages');

socket.on('connect', () => console.log('Socket Connected'));

messageServiceV1.on('create', message => console.log('Received a API V1 message', message));
messageServiceV2.on('create', message => console.log('Received a API V2 message', message));
messageService.on('create', message => console.log('Received an API message', message));

console.log('Feathers client running');