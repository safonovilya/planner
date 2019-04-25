const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  startDateTime: Date, // 2019-04-08 17:50
  endDateTime: Date, // 2019-04-08 19:40
  attendees: [mongoose.SchemaTypes.Mixed],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventTemplate',
  },
}, {
  timestamps: true
});

const eventTemplateSchema = new mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calendar',
  },
  startTime: Number, // 17:50 = 17*60 + 50
  endTime: Number, // 19:40 = 19*60 + 40
  startDate: Date, // 2019-04-15
  endDate: Date, // 2020-04-15
  duration: String, // moment.duration('PT-1H50M')
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

  location: String,
}, {
  timestamps: true
});

//TODO create on "create, update, remove" streams to log data

mongoose.model('Event', eventSchema);
mongoose.model('EventTemplate', eventTemplateSchema);
