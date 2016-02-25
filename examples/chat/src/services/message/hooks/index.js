'use strict';

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
  create: [],
  update: [auth.queryWithUserId({ idOnResouce: 'sentBy' })],
  patch: [auth.queryWithUserId({ idOnResouce: 'sentBy' })],
  remove: [auth.queryWithUserId({ idOnResouce: 'sentBy' })]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
