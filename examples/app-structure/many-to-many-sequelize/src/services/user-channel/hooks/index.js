'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const reduce = function(options, callback) {
  // always run by default
  callback = typeof callback === 'function' ? callback : (hook) => true;

  return function(hook) {
    const isPaginated = (hook.method === 'find' && hook.result.data);
    const data = isPaginated ? hook.result.data : hook.result;

    const next = () => {
      if (hook.type === 'after') {
        if (Array.isArray(data)) {
          const results = data.reduce((prev, current) => {
            
            // If it's a mongoose model then
            if (typeof prev.toObject === 'function') {
              prev = prev.toObject(options);
            }
            // If it's a Sequelize model
            else if (typeof prev.toJSON === 'function') {
              prev = prev.toJSON(options);
            }

            // If it's a mongoose model then
            if (typeof current.toObject === 'function') {
              current = current.toObject(options);
            }
            // If it's a Sequelize model
            else if (typeof current.toJSON === 'function') {
              current = current.toJSON(options);
            }
            
            let obj = Object.assign({}, prev, current);

            // if we don't have our field (ie. first pass) then add it to the object
            if (!obj[options.fieldName]) {
              obj[options.fieldName] = [ prev[options.field] ];
            }
            
            if (current[options.field]) {
              obj[options.fieldName].push(current[options.field]);
            }

            return obj;
          });

          if (isPaginated) {
            hook.result.data = [results];
          } else {
            hook.result = results;
          }
        }

        return hook;
      }
    };

    const hookShouldRun = callback(hook);

    // If hook shouldn't run then bypass it
    if (!hookShouldRun) {
      return hook;
    }

    // If callback function returned a promise then call this
    // hook as the next function in the promise chain.
    if (typeof hookShouldRun.then === 'function') {
      return hookShouldRun.then(next);
    }

    return next();
  };
};

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [
    // If searching for a user
    // $populate: ['channels']
    hooks.populate('channels', { service: 'channels', through: 'user-channels', field: channelId, lookupField: userId }, hook => hook.params.query.$populate = 'channel')
    hooks.populate('channel', {service: 'channels', field: 'channelId'}, hook => !!hook.params.query.userId),
    reduce({ service: 'user-channels', fieldName: 'channels', field: 'id' }, hook => !!hook.params.query.userId),
    hooks.pluck('userId', 'channels', hook => !!hook.params.query.userId),

    // // If searching for a channel
    // hooks.populate('user', {service: 'users', field: 'userId'}, hook => !!hook.params.query.channelId),
    // reduce({ fieldName: 'users', field: 'user' }, hook => !!hook.params.query.channelId),
    // hooks.pluck('channelId', 'users', hook => !!hook.params.query.channelId)
  ],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
