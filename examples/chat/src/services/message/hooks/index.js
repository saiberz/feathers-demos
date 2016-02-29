'use strict';

const populateSender = require('./populate-sender');
const globalHooks = require('../../../hooks');
const auth = require('feathers-authentication').hooks;
const hooks = require('feathers-mongoose').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  find: [],
  get: [],
  create: [auth.setUserId({destProp: 'sentBy'})],
  update: [auth.queryWithUserId({ idOnResource: 'sentBy' })],
  patch: [auth.queryWithUserId({ idOnResource: 'sentBy' })],
  remove: [auth.queryWithUserId({ idOnResource: 'sentBy' }), function(hook) {
    console.log(hook.params);
  }]
};

exports.after = {
  all: [],
  find: [
    hooks.toObject(),
    populateSender()
  ],
  get: [
    hooks.toObject(),
    populateSender()
  ],
  create: [
    hooks.toObject(),
    populateSender()
  ],
  update: [],
  patch: [],
  remove: []
};
