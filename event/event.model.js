// {
//     "status": string,
//     "summary": string,
//     "location": string,
//     "creatorId": string,
//     "organizerId" string,
//     "start": {
//       "date": date,
//       "dateTime": datetime,
//       "timeZone": string
//     },
//     "end": {
//       "date": date,
//       "dateTime": datetime,
//       "timeZone": string
//     },
//     "endTimeUnspecified": boolean,
//     "recurrence": [
//       string
//     ],
//     "recurringEventId": string,
//     "originalStartTime": {
//       "date": date,
//       "dateTime": datetime,
//       "timeZone": string
//     },
//     "sequence": integer,
//     "attendees": [
//       {
//         "id": string,
//         "email": string,
//         "displayName": string,
//         "resource": boolean,
//         "comment": string,
//         "additionalGuests": integer
//       }
//     ],
//     "reminders": {
//       "useDefault": boolean,
//       "overrides": [
//         {
//           "method": string,
//           "minutes": integer
//         }
//       ]
//     },
//     "source": {
//       "url": string,
//       "title": string
//     },
//     "attachments": [
//       {
//         "fileUrl": string,
//         "title": string,
//         "mimeType": string,
//         "iconLink": string,
//         "fileId": string
//       }
//     ]
//   }

const mongoose = require('mongoose');
const { Schema } = mongoose;
const eventSchema = new Schema({
  organizerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  start: Date,
  end: Date,
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
  reminders: {
    useDefault: Boolean,
    overrides: [
      {
        method: String,
        minutes: Number,
      },
    ],
  },
});
const eventTemplate = new mongoose.Schema({
  organizerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  start: Date,
  end: Date,
  title: String,
  status: String,
  location: String,
});

mongoose.model('Event', eventSchema);
mongoose.model('EventTemplate', eventTemplate);
