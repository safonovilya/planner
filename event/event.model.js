const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  dateTime: Date,
  duration: Date,
  attendees: [
    // metadata
    mongoose.SchemaTypes.Mixed,
    // {
    //   id: string,
    //   email: string,
    //   displayName: string,
    //   resource: boolean,
    //   comment: string,
    //   additionalGuests: integer,
    // },
  ],
});
const eventTemplate = new mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calendar',
  },
  start: Date,
  end: Date,
  title: String,
  status: String,
  repeatable: mongoose.SchemaTypes.Mixed,
  // location: String,
});

mongoose.model('Event', eventSchema);
mongoose.model('EventTemplate', eventTemplate);

/*
const EventTemplate = {
  // start
  // end

  // repeatable
  repeatable : {
    // sec {0-59}
    // min {0-59}
    // hour {0-23}
    // week {0-6}
    week: {
      1: true,
      3: true,
    },
    // months {0-11}
    // year
  },

  status: ENUM(['active', 'inactive', 'deleted'])
}
*/
