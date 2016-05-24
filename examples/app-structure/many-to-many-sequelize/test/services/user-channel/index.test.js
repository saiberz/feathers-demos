'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('user-channel service', function() {
  it('registered the user-channels service', () => {
    assert.ok(app.service('user-channels'));
  });
});
