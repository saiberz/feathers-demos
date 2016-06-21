'use strict';

// user-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(options = {}) {
  const app = this;
  const messageSchema = new Schema({
    text: { type: String, required: true },
    sentBy: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
  });

  return mongoose.model('message', messageSchema);
};