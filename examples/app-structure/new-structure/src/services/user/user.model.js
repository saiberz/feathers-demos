'use strict';

// user-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(options = {}) {
  const app = this;
  const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, require: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
  });

  return mongoose.model('user', userSchema);
};