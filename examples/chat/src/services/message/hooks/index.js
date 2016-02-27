'use strict';

const populateSender = require('./populate-sender');
const globalHooks = require('../../../hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  find: [],
  get: [],
  create: [auth.setUserId({destProp: 'sentBy'})],
  update: [auth.queryWithUserId({ idOnResouce: 'sentBy' })],
  patch: [auth.queryWithUserId({ idOnResouce: 'sentBy' })],
  remove: [auth.queryWithUserId({ idOnResouce: 'sentBy' })]
};

exports.after = {
  all: [],
  find: [populateSender()],
  get: [populateSender()],
  create: [populateSender()],
  update: [],
  patch: [],
  remove: []
};
