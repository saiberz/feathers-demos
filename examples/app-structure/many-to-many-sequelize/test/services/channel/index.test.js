'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('channel service', () => {
  it('registered the channels service', () => {
    assert.ok(app.service('channels'));
  });
});
