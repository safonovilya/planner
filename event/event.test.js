const assert = require('assert');
const expect = require('expect.js');
const db = require('../db');
const { ObjectId } = require('mongoose').Types;
const EventModel = require('mongoose').model('Event');
const EventTemplateModel = require('mongoose').model('EventTemplate');
const { EventCore, Event, EventTemplate } = require('./event.core.js');

const mockEventTemplate = {
  organizerId: new ObjectId('5cb637a4d591c25e1ae24e33'),
  startDateTime: new Date(),
  endDateTime: new Date(),
  title: 'Mock Object',
  status: 'active',
  repeatable: {
    hour: { 16: true },
    week: {
      0: true,
      2: true,
      4: true,
    },
  }, // repeat every 16:00 on Monday Wednesday Friday
};
const mockEvent = {
  organizerId: new ObjectId('5cb637a4d591c25e1ae24e33'),
  startDateTime: new Date(),
  endDateTime: new Date(),
  title: 'Mock Object',
  status: 'active',
  repeatable: {
    hour: { 16: true },
    week: {
      0: true,
      2: true,
      4: true,
    },
  }, // repeat every 16:00 on Monday Wednesday Friday
};

describe('Create Event Model Object', () => {
  before(async () => {
    try {
      return await EventModel.collection.drop();
    } catch (e) {
      return e;
    }
  });

  it('new Event', done => {
    const event = new EventModel();
    event.save().then(() => {
      done();
    });
  });

  it('get Events', async () => {
    const events = await EventModel.find();
    assert.equal(events.length, 1);
  });
});

describe('Create EventTemplate Model Object', () => {
  before(async () => {
    try {
      return await EventTemplateModel.collection.drop();
    } catch (e) {
      return e;
    }
  });

  it('new EventTemplate', () => {
    const event = new EventTemplateModel(mockEventTemplate);
    return event.save().then(result => {
      expect(result.toObject()).to.have.property('startDateTime');
      expect(result.toObject()).to.have.property('endDateTime');
      expect(result.toObject()).to.have.property(
        'title',
        mockEventTemplate.title,
      );
      expect(result.toObject()).to.have.property(
        'status',
        mockEventTemplate.status,
      );
      expect(result.toObject()).to.have.property('repeatable');
    });
  });

  it('get EventTemplate', async () => {
    const events = await EventTemplateModel.find();
    assert.equal(events.length, 1);
    const event = events[0];
    expect(event.toObject()).to.have.property('startDateTime');
    expect(event.toObject()).to.have.property('endDateTime');
    expect(event.toObject()).to.have.property('title', mockEventTemplate.title);
    expect(event.toObject()).to.have.property(
      'status',
      mockEventTemplate.status,
    );
    expect(event.toObject()).to.have.property('repeatable');
  });
});

describe('Core Event Class', () => {
  before(async () => {
    try {
      await EventTemplateModel.collection.drop();
      return await EventModel.collection.drop();
    } catch (e) {
      return e;
    }
  });

  it('Create Object Event', async () => {
    const event = await EventCore.create();
    const events = await EventTemplateModel.find();
    assert.equal(events.length, 1);
    return null;
  });

  it('get list Events', async () => {
    const events = await EventCore.getList();
    assert.equal(events.length, 1);
    return null;
  });
  it('CoreEvent.getList should return only Event objects', async () => {
    const events = await EventCore.getList();
    events.forEach(event => {
      assert(event instanceof Event);
    });
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
      startDateTime: start,
      endDateTime: end,
      repeatable: {
        hour,
      },
    });
    const events = await EventCore.getList({
      startDateTime: start,
      endDateTime: end,
    });
    assert.equal(events.length, 24);

    const eventTemplate = await EventTemplateModel.findOne({ title: 'every hour' });
    assert.equal(eventTemplate.repeatable.hour.length, 24);

    return null;
  });

  xit('Core Event Methods should return only Event objects', () => {});
});

describe('Event Class', () => {
  xit('Should have format method');
  xit('Should have able to created by instance of EventTemplate obj');
});

describe('EventTemplate Class', () => {
  xit('Should have get Events methods');
});
