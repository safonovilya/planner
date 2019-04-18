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
      done(e);
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
      await EventTemplate.collection.drop();
      await Event.collection.drop();
      return null;
    } catch (e) {
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

  it('Create Repeatable Event every hour', async () => {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 1);
    const hour = [...Array(24).keys()].map(el => {
      const o = {};
      o[`${el}`] = true;
      return o;
    });

    const event = await EventCore.create({
      title: 'every hour',
      start,
      end,
      repeatable: {
        hour,
      },
    });
    const events = await EventCore.getList();
    assert.equal(events.length, 25);
    return null;
  });
});
