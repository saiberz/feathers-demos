'use strict';

const assert = require('assert');
const restrictToOwner = require('../../../../src/services/message/hooks/restrict-to-owner.js');

describe('message restrictToOwner hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };
    
    restrictToOwner()(mockHook);
    
    assert.ok(mockHook.restrictToOwner);
  });
});
