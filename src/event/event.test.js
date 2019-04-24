require('dotenv').config();
require('../../db');
const assert = require('assert');
const expect = require('expect.js');
const { ObjectId } = require('mongoose').Types;
const EventModel = require('mongoose').model('Event');
const EventTemplateModel = require('mongoose').model('EventTemplate');
const { EventCore, Event } = require('./event.core.js');
const moment = require('moment');
moment().format();

let today = new Date(),
  tomorrow = today.setDate(today.getDate() + 1);
const startTime = 9 * 60 + 40; // 9:40
const endTime = 11 * 60 + 30; // 11:30
const duration = endTime - startTime;

const mockEventTemplate = {
  organizerId: new ObjectId('5cb637a4d591c25e1ae24e33'),
  startTime: startTime,
  startDate: today,
  endTime: endTime,
  endDate: tomorrow,
  duration,
  title: 'Mock Object',
  status: 'active',
  repeatable: {
    hour: { 16: true },
    week: {
      0: true,
      2: true,
      4: true,
    },
  }, // repeat every 9:40 on Monday Wednesday Friday
};
/*const mockEvent = {
  organizerId: new ObjectId('5cb637a4d591c25e1ae24e33'),
  startTime: today, // todo: set proper date time
  startDate: today,
  title: 'Mock Object',
  meta: {
    some: 'data',
  },
  attendees: ['user.id', 'user1.id'],
};*/

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
      expect(event.toObject()).to.have.property('startDate');
      expect(event.toObject()).to.have.property('startTime');
      expect(event.toObject()).to.have.property('endDate');
      expect(event.toObject()).to.have.property('endTime');
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
    expect(event.toObject()).to.have.property('startDate');
    expect(event.toObject()).to.have.property('startTime');
    expect(event.toObject()).to.have.property('endDate');
    expect(event.toObject()).to.have.property('endTime');
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
    const start = today;
    const end = tomorrow;
    const hour = [...Array(24).keys()].map(el => {
      const o = {};
      o[`${el}`] = true;
      return o;
    });

    await EventCore.create({
      title: 'every hour',
      startTime: 0,
      endTime: 30,
      startDate: start,
      endDate: end,
      repeatable: {
        hour,
      },
    });
    const events = await EventCore.getList({
      startDate: start,
      endDate: end,
    });
    assert.equal(events.length, 24);

    const eventTemplate = await EventTemplateModel.findOne({
      title: 'every hour',
    });
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
