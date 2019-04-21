const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  startDateTime: Date,
  endDateTime: Date,
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
  start: Date,
  end: Date,
  startTime: Date,
  endTime: Date,
  title: String,
  status: String, //ENUM(['active', 'inactive', 'deleted'])

  /** sec {0-59}
      min {0-59}
      hour {0-23}
      week {0-6}
      months {0-11}
      year
   */
  repeatable: mongoose.SchemaTypes.Mixed,

  // location: String,
});

mongoose.model('Event', eventSchema);
mongoose.model('EventTemplate', eventTemplateSchema);
