const EventTemplateModel = require('mongoose').model('EventTemplate');
const EventModel = require('mongoose').model('Event');
const unwind = require('lodash-unwind')();

/**
 * Class Event
 *
 */
class EventCore {
  /**
   * Create Event
   * @param payload
   * @returns {Promise<Event>}
   */
  static async create(payload) {
    const { title, organizerId, start, end, status, location, repeatable } =
      payload || {};
    const event = new EventTemplateModel({
      title,
      organizerId,
      start,
      end,
      status,
      location,
      repeatable,
    });
    await event.save();
    return event;
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
   * @param start Date
   * @param end Date
   * @param owner ID
   * @param status 'active'|'inactive'|'deleted'
   * @returns {Promise<Event>}
   */
  static async getList(filter) {
    const { start, end, owner } = filter || {};
    const eventTemplates = await EventTemplateModel.find().lean();
    // const events = await Event.find();

    const events = unwind(eventTemplates, 'repeatable.hour', {
      ignoreNonArray: false,
    });
    // todo set date based on repeatable

    events.forEach(el => {
      console.log(el);
    });

    // const hashMap = {
    //   `${eventTemplateID}${exectDateTime}` = EventTemplate
    // }

    // todo for each existed events and replace eventTemplate

    //eventTemplates -> generatedEvents match Events by  eventTemplateID + exact datetime

    return events;
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
        _id
      } = payload;
    }

    this.startDateTime = startDateTime;
    this._id = _id;
    //...
  }


  async save(){
    let event;

    if (this._id){
      event = await EventModel.find()
    } else {

      event = await new EventModel({
        //...
        meta
      }).save()
    }
    return event;
  }

  format() {
    return {
      startDateTime: startDateTime.format('YYYY-MM-DD')
      //...
    }
  }
}

module.exports = EventCore;
