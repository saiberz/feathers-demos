'use strict';

const assert = require('assert');
const populateSender = require('../../../../src/services/message/hooks/populate-sender.js');

describe('message populateSender hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };
    
    populateSender()(mockHook);
    
    assert.ok(mockHook.populateSender);
  });
});
