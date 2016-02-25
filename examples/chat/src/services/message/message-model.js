'use strict';

// message-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TWENTY_MB = 20480000; // in bytes
const MAX_DOCUMENTS = 5000;

const messageSchema = new Schema({
  text: { type: String, required: true },
  sentBy: {type: Schema.ObjectId, ref: 'user'},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

messageSchema.index({ updatedAt: -1 });
// TODO (EK): Possibly make it a capped collection. You can't delete individual
// documents from a capped collection.
// messageSchema.set('capped', { size: TWENTY_MB, max : MAX_DOCUMENTS })

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;