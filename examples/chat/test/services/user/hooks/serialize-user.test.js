'use strict';

const assert = require('assert');
const serializeUser = require('../../../../src/services/user/hooks/serialize-user.js');

describe('user serializeUser hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };
    
    serializeUser()(mockHook);
    
    assert.ok(mockHook.serializeUser);
  });
});
