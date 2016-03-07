const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');

const socketV1 = io('http://localhost:3030/api/v1/messages');
const socketV2 = io('http://localhost:3030/api/v2/messages');

const apiV1 = feathers().configure(socketio(socketV1));
const apiV2 = feathers().configure(socketio(socketV2));

// Get the message service that uses a websocket connection
const messageServiceV1 = apiV1.service('messages');
const messageServiceV2 = apiV2.service('messages');

messageServiceV1.on('created', message => console.log('Received a API V1 message', message));
messageServiceV2.on('created', message => console.log('Received a API V2 message', message));

console.log('Feathers client running');