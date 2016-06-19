'use strict';

const hooks = require('feathers-authentication').hooks;

module.exports = function(options) {
  // Add any custom options

  return function(hook) {
    console.log('My custom hash hook is running');

    return new Promise((resolve, reject) => {
      // You can define custom conditions when the hook should run
      const doNotRun = hook.app.get('auth') === undefined;

      // Don't run if auth in config is undefined
      if (doNotRun) {
        return resolve(hook);
      }

      // call the original hook
      hooks.hashPassword(options)(hook)
        .then(hook => {
          // do something custom
          hook.params = 'custom';
          resolve(hook);
        })
        .catch(error => {
          // do any custom error handling
          error.message = 'my custom message';
          reject(error);
        });
    });
  };
};