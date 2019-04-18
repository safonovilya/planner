const EventTemplate = require('mongoose').model('EventTemplate');
/**
 * Class Event
 *
 createEvent(payload) //<Event>
 updateEvent (id, payload) //<Event>
 getEvent(id) //<Event>
 getEvents({
     range:(start-end),
     status:('active'|'inactive'|'deleted'),
     owner:(CalendarID)
   }) // [<Event>]
 deleteEvent(EventID) // ok|<Error>
 */
class EventCore {

  /**
   * Create EventTemplate and save to DB
   * @param payload
   * @returns {Promise<Model>}
   */
  static async create(payload) {
    const { title, organizerId, start, end, status, location } = payload || {};
    const event = new EventTemplate({
      title,
      organizerId,
      start,
      end,
      status,
      location,
    });
    await event.save();
    return event;
  }
  static async getList() {
    const events = await EventTemplate.find();
    return events
  }

  /**
   * get RepeatEvent in range
   * get Events from db by RepeatEventID
   * merge generated list by ReapeatEvents and Events from DB
   */

  /**
   * update close old ... create new
   *
   */

}

module.exports = EventCore;
