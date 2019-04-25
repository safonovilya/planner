const EventTemplateModel = require('mongoose').model('EventTemplate');
const EventModel = require('mongoose').model('Event');
const unwind = require('lodash-unwind')();
const _ = require('lodash');

const DAY_FORMAT = require('../config/constants').DAY_FORMAT;

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
    } = payload || {};
    const event = new EventTemplateModel({
      title,
      organizerId,
      startTime,
      endTime,
      startDate,
      endDate,
      status,
      location,
      repeatable,
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
  }

  /**
   *
   * @param filter.startDateTime Date Required
   * @param filter.endDateTime Date Required
   * @param filter.owner ID Required
   * @param filter.status 'active'|'inactive'|'deleted'
   * @returns {Promise<Event>}
   */
  static async getList(filter) {
    const { startDate, endDate, owner, status } = filter || {};

    //TODO: max diff in startDate, endDate 3 months

    const query = {
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
      owner,
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
 * update
 * format
 *
 * accept eventTemplate instance
 */
class Event {
  // startDateTime: Date,
  // endDateTime: Date,
  // attendees:[]
  // organizerId: ID
  // title: String,
  // status: String,

  constructor(payload) {
    if (payload instanceof EventTemplateModel) {
      // build
      // startDateTime: Date,
      // endDateTime: Date,
      // by repeatable and start end time
    } else {
      Object.assign(this,
        _.pick(payload, [
          'startDateTime',
          'endDateTime',
          'attendees',
          'owner',
          'timestamps',
          '_id'
        ])
      );
    }
  }

  async save() {
    return EventModel.findOneAndUpdate({_id: this._id}, this, {upsert:true},
      (err, doc) => {
        //TODO add error handlers
        //handleError(err)
        return doc;
      });
  }

  format(inputFormat) {
    return {
      startDateTime: moment(this.startDateTime).format(inputFormat || DAY_FORMAT)
    };
  }
}

module.exports = {
  EventCore,
  Event,
  EventTemplate,
};
