const _ = require('lodash');
const EventTemplateModel = require('mongoose').model('EventTemplate');
const EventModel = require('mongoose').model('Event');
const unwind = require('lodash-unwind')();
const moment = require('moment');

const DAY_TIME_FORMAT = require('../config/constants').DAY_TIME_FORMAT;

/**
 * @param eventTemplate <EventTemplate>
 * @returns {Array<EventTemplate>|<EventTemplate>}
 */
function repeatableUnwind(eventTemplate) {
  if (eventTemplate.repeatable) {
    const keys = Object.keys(eventTemplate.repeatable);

    return keys.reduce(
      (acc, el) => {
        return unwind(acc, `repeatable.${el}`, {
          ignoreNonArray: false,
        });
      },
      [eventTemplate],
    );
  } else {
    return eventTemplate;
  }
}

/**
 * Class Event
 *
 */
class EventCore {
  /**
   * Create Event
   * @param payload
   * @param payload.title String
   * @param payload.status String active|deleted|inactive
   * @param payload.startDate Date
   * @param payload.startTime Number
   * @param payload.endDate Date
   * @param payload.endTime Number
   * @param payload.organizerId ObjectID
   * @param payload.repeatable Object
   * @returns {true|Error}
   */
  static async create(payload) {
    const {
      title,
      organizerId,
      startTime,
      endTime,
      startDate,
      endDate,
      status,
      location,
      repeatable,
      duration,
    } = payload || {};
    const event = new EventTemplateModel({
      title,
      organizerId,
      startTime,
      endTime,
      startDate: moment(startDate).startOf('day'),
      endDate: moment(endDate).endOf('day'),
      status,
      location,
      repeatable,
      duration: duration || endTime - startTime,
    });
    await event.save();
    return true;
  }

  /**
   * Get Event
   * @returns {Promise<Event>}
   */
  static async getEvent(id) {
    // find by id
    // build class Event
    const rawEvent = await EventModel.findOne({ _id: id }).populate(
      'eventTemplateId',
    );
    if (!rawEvent) {
      return rawEvent;
    }
    return new Event(rawEvent);
  }

  /**
   *
   * @param filter.startDate Date Required
   * @param filter.endDate Date Required
   * @param filter.eventTemplateId ID Required
   * @param filter.status 'active'|'inactive'|'deleted'
   * @returns {Promise<Event>}
   */
  static async getList(filter) {
    let { startDate, endDate, eventTemplateId, status } = filter || {};

    if (!startDate) {
      startDate = moment().startOf('day');
    }
    if (!endDate) {
      endDate = moment()
        .endOf('day')
        .add(3, 'month');
    }

    const query = {
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
      eventTemplateId,
    };
    status ? (query.status = status) : null;

    const eventTemplates = await EventTemplateModel.find(query).lean();
    // const events = await Event.find();

    const events = _.flatten(
      eventTemplates.map(eventTemplate => {
        return repeatableUnwind(eventTemplate);
      }),
    );

    // const hashMap = {
    //   `${eventTemplateID}${exectDateTime}` = EventTemplate
    // }

    // todo for each existed events and replace eventTemplate

    //eventTemplates -> generatedEvents match Events by  eventTemplateID + exact datetime

    return events.map(event => {
      // console.log(el);
      return new Event(event);
    });
  }

  /**
   * Soft delete
   * @param eventID
   * @returns {Promise<ok|Error>}
   */
  static async deleteEvent(eventID) {
    //todo: mark event like deleted
  }

  /**
   * updateEvent (id, payload) //<Event>
   */

  /**
   * update immutable field for event
   * close old ... create new with copy other fields
   */
}

/**
 * format
 * getExactTime
 */
class EventTemplate {
  // getExactTime;
}

/**
 * @method update
 * @method format
 *
 * @param startDateTime: Date,
 * @param endDateTime: Date,
 * @param attendees:[]
 * @param organizerId: ID
 * @param title: String,
 * @param status: String,
 *
 *  accept eventTemplate instance
 */
class Event {
  constructor(payload) {
    // Event Template Obj
    if (
      // payload instanceof EventTemplateModel - not working because of unwind by repeatable field
      !payload.eventTemplateId &&
      payload._id
    ) {
      // startDateTime: Date,
      // endDateTime: Date,
      // by repeatable and start end time
      const { startDate, endDate, repeatable, duration, _id } = payload;
      Object.assign(
        this,
        _.pick(payload, [
          'organizerId',
          'title',
          'status',
          'eventTemplateId',
          '_id',
          'duration',
        ]),
      );

      const timeShifts = _.toPairs(repeatable).map(o => {
        o[1] = _.keys(o[1])[0];
        return o;
      });
      this.startDateTime = moment(startDate);
      timeShifts.forEach(el => {
        this.startDateTime = this.startDateTime.add(el[1], el[0]);
      });
      this.endDateTime = moment(this.startDateTime);
      this.endDateTime.add(duration, 'minutes'); // + repeatable
      this._id = null;
      this.eventTemplateId = _id;
    } else {
      // Event Obj
      Object.assign(
        this,
        _.pick(payload, [
          'startDateTime',
          'endDateTime',
          'attendees',
          'organizerId',
          'title',
          'status',
          'eventTemplateId',
          '_id',
        ]),
      );

      Object.assign(
        this,
        _.pick(this.eventTemplateId, [
          'organizerId',
          'title',
          'status',
          'eventTemplateId',
          '_id',
          'duration',
        ]),
      );
      this.eventTemplateId = this.eventTemplateId._id;
    }

    return this;
  }

  async save() {
    const fieldsMap = {
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
      attendees: this.attendees,
      organizerId: this.organizerId,
      title: this.title,
      status: this.status,
      eventTemplateId: this.eventTemplateId,
    };

    if (this._id) {
      await EventModel.updateOne({ _id: this._id }, fieldsMap, {
        upsert: true,
      });
    } else {
      const newEvent = await new EventModel(fieldsMap).save();
      this._id = newEvent._id;
    }
    return this;
  }

  format(options) {
    const { dateTimeFormat } = options || {};
    return {
      startDateTime: moment(this.startDateTime).format(
        dateTimeFormat || DAY_TIME_FORMAT,
      ),
      endDateTime: moment(this.endDateTime).format(
        dateTimeFormat || DAY_TIME_FORMAT,
      ),
      attendees: this.attendees,
      organizerId: this.organizerId,
      title: this.title,
      status: this.status,
      eventTemplateId: this.eventTemplateId,
    };
  }
}

module.exports = {
  EventCore,
  Event,
  EventTemplate,
};
