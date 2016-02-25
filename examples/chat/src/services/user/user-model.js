'use strict';

// user-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  online: { type: Boolean, 'default': false },
  photoURL: { type: String, 'default': 'https://distillery.s3.amazonaws.com/profiles/anonymousUser.jpg' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

userSchema.index({ username: 1 });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;