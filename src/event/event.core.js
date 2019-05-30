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
    const rawEvent = await EventModel.findOne({ _id: id });
    if (!rawEvent) {
      return rawEvent;
    }
    return new Event(rawEvent);
  }

  /**
   *
   * @param filter.startDate Date Required
   * @param filter.endDate Date Required
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

    let events = _.flatten(
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
    if (
      // payload instanceof EventTemplateModel - not working because of unwind by repeatable field
      !payload.eventTemplateId && payload._id
    ) {
      // startDateTime: Date,
      // endDateTime: Date,
      // by repeatable and start end time
      const {
        startDateTime,
        endDateTime,
        attendees,
        organizerId,
        title,
        status,
        repeatable,
        _id,
      } = payload;

      this.startDateTime = startDateTime;
      this.endDateTime = endDateTime;
      this.endDateTime = endDateTime;
      this.attendees = attendees;
      this.organizerId = organizerId;
      this.title = title;
      this.status = status;
      this._id = null;
      this.eventTemplateId = _id;
    } else {
      const {
        startDateTime,
        endDateTime,
        attendees,
        organizerId,
        title,
        status,
        eventTemplateId,
        _id,
      } = payload;
      this.startDateTime = startDateTime;
      this.endDateTime = endDateTime;
      this.attendees = attendees;
      this.organizerId = organizerId;
      this.title = title;
      this.status = status;
      this.eventTemplateId = eventTemplateId;
      this._id = _id;
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
