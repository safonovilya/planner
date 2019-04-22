const EventTemplateModel = require('mongoose').model('EventTemplate');
const EventModel = require('mongoose').model('Event');
const unwind = require('lodash-unwind')();
const _ = require('lodash');

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
   * @param payload.startDateTime Date
   * @param payload.endDateTime Date
   * @param payload.organizerId ObjectID
   * @param payload.repeatable Object
   * @returns {Promise<Event>}
   */
  static async create(payload) {
    const { title, organizerId, startDateTime, endDateTime, status, location, repeatable } =
      payload || {};
    const event = new EventTemplateModel({
      title,
      organizerId,
      startDateTime,
      endDateTime,
      status,
      location,
      repeatable,
    });
    return await event.save();
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
    const { startDateTime, endDateTime, owner } = filter || {};
    const query = {
      startDateTime: { $gte: startDateTime },
      endDateTime: { $lte: endDateTime },
      owner,
    };
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
      const {
        startDateTime,
        endDateTime,
        attendees,
        organizerId,
        title,
        status,
        _id,
      } = payload;
      this.startDateTime = startDateTime;
      this._id = _id;
    }

    //...
  }

  async save() {
    let event;

    if (this._id) {
      event = await EventModel.find();
    } else {
      event = await new EventModel({
        //...
        meta,
      }).save();
    }
    return event;
  }

  format() {
    return {
      startDateTime: startDateTime.format('YYYY-MM-DD'),
      //...
    };
  }
}

module.exports = {
  EventCore,
  Event,
  EventTemplate,
};
