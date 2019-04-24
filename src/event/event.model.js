const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  startDateTime: Date, // 17:50
  endDateTime: Date, // 19:40
  attendees: [mongoose.SchemaTypes.Mixed],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventTemplate',
  },
});

const eventTemplateSchema = new mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calendar',
  },
  startDateTime: Date, //2019-04-15 17:50
  endDateTime: Date, //2020-04-15 19:40
  title: String,
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted']
  },

  /** sec {0-59} ???
      min {0-59}
      hour {0-23} // MVP
      dayOfWeek {0-6} // MVP
      weekOfMonths {0-5} // MVP
      dayOfMonths {0-28|29|30|31} // MVP
      month {0-11} // MVP
   */
  repeatable: mongoose.SchemaTypes.Mixed,

  // location: String,
});

mongoose.model('Event', eventSchema);
mongoose.model('EventTemplate', eventTemplateSchema);
