const assert = require('assert');
const mongoose = require('mongoose');
const Event = require('./event/event.model');

// assert.notEqual(process.env.MONGODB_URL, undefined);
const mongoURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/test';

const dbName = 'aeroyoga';

mongoose.connect(mongoURL, { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log("we're connected!");
});
