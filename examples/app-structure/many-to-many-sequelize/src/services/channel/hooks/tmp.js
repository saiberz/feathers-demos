'use strict';

// src/services/message/hooks/process.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function(options) {
  return function(hook) {
    // If we have a userId then call the user-channels service instead
    if (hook.params.query && hook.params.query.userId) {
      return hook.app.service('user-channels').find(params.query).then(result => {
        return hook.result = result;
      });
    }
  };
};
