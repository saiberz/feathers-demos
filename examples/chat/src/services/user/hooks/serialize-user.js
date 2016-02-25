'use strict';

// src/services/user/hooks/serialize-user.js.js
// 
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    function serialize(item) {
      return {
        _id: item._id,
        username: item.username,
        online: item.online,
        photoURL: item.photoURL
      };
    }

    // If it's an after hook and it was an external request.
    if (hook.type === 'after' && hook.params.provider) {
      // Handle arrays.
      if (Array.isArray(hook.result.data)) {
        hook.result.data = hook.result.data.map(item => {
          return serialize(item);
        });
      }
      // Handle single objects.
      else {
        hook.result = serialize(hook.result);
      }
    }
  };
};
