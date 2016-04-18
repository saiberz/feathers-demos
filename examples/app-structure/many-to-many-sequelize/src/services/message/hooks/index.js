'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const process = require('./process');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [process()],
  update: [
    hooks.remove('sentBy'),
    auth.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })
  ],
  patch: [
    hooks.remove('sentBy'),
    auth.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })
  ],
  remove: [auth.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })]
};

exports.after = {
  all: [],
  find: [hooks.populate('sentBy', { service: 'users', field: 'sentBy' })],
  get: [hooks.populate('sentBy', { service: 'users', field: 'sentBy' })],
  create: [hooks.populate('sentBy', { service: 'users', field: 'sentBy' })],
  update: [],
  patch: [],
  remove: []
};
