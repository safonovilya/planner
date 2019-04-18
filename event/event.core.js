const EventTemplate = require('mongoose').model('EventTemplate');
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
    const event = new EventTemplate({
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
  static async getEvent(id) {}

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
    const eventTemplates = await EventTemplate.find().lean();
    // const events = await Event.find();

    const events = unwind(eventTemplates, 'repeatable.hour', {
      ignoreNonArray: false,
    });

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

module.exports = EventCore;
