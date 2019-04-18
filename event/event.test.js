const assert = require('assert');
const db = require('../db');
const Event = require('mongoose').model('Event');
const EventTemplate = require('mongoose').model('EventTemplate');
const EventCore = require('./event.core.js');

describe('Create Event Model Object', () => {
  before(done => {
    try {
      Event.collection.drop();
      done();
    } catch (e) {
      done(e);
      console.log('asda ');

    }
  });

  it('new Event', done => {
    const event = new Event();
    event.save().then(() => {
      done();
    });
  });

  it('get Events', async () => {
    const events = await Event.find();
    assert.equal(events.length, 1);
  });
});

describe('Create EventTemplate Model Object', () => {
  before(done => {
    try {
      EventTemplate.collection.drop();
      done();
    } catch (e) {
      console.log('e');
    }
  });

  it('new EventTemplate', done => {
    const event = new EventTemplate();
    event.save().then(() => {
      done();
    });
  });

  it('get EventTemplate', async () => {
    const events = await EventTemplate.find();
    assert.equal(events.length, 1);
  });
});

describe('Core Event Class', () => {
  before(async () => {
    try {
      // await EventTemplate.collection.drop();
      // await Event.collection.drop();
      return null;
    } catch (e) {
      console.log('asda ');
      return -1;
    }
  });

  it('Create Object Event', async () => {
    const event = await EventCore.create();
    const events = await EventTemplate.find();
    assert.equal(events.length, 1);
    return null;
  });

  it('get list Events', async () => {
    const events = await EventCore.getList();
    assert.equal(events.length, 1);
    return null;
  });
});
