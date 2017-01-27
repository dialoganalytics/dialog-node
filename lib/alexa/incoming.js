'use strict';

var locale = require('./locale')

// Incoming payload for Dialog API
//
// {
//   "session": {
//     "sessionId": "SessionId.5531df55-fed9-4a8e-9217-afb2b1deb955",
//     "application": {
//       "applicationId": "amzn1.ask.skill.1b83076b-8262-4da4-a773-43a58ee9a821"
//     },
//     "attributes": {},
//     "user": {
//       "userId": "amzn1.ask.account.AFLTEFO4OZJWRSSB5QRZ7GPQAGY72ZW4CIGRDXMWUXAUN6SYTTX2GRD4GER6GJ3GNGTFSOEDP56MJMFPQCYIGPSCTQHA33ZOKQWDDU2TXFOPM5F3WFEG5SBJXEZYN7K45UH63NXC65C77KAW4RX52OR7ESPNBYQF4SEEB4CVEQH6FR4YVNMIMS5PW4IVTO245XKD7VF2M4UHVQY"
//     },
//     "new": true
//   },
//   "request": {
//     "type": "IntentRequest",
//     "requestId": "EdwRequestId.03f17ea3-e95f-43a5-96f9-428cca0cdd87",
//     "locale": "en-US",
//     "timestamp": "2017-01-20T16:47:18Z",
//     "intent": {
//       "name": "GetName",
//       "slots": {
//         "Name": {
//           "name": "Name",
//           "value": "Nick"
//         }
//       }
//     }
//   },
//   "version": "1.0"
// }
//
// @param {Object} payload
function incomingPayload(payload) {
  return {
    message: {
      distinct_id: payload.request.requestId,
      platform: 'alexa',
      provider: 'dialog-node',
      mtype: 'text',
      sent_at: Date.parse(payload.request.timestamp) / 1000,
      properties: {
        text: "TODO"
      }
    },
    conversation: {
      distinct_id: payload.session.sessionId
    },
    creator: {
      distinct_id: payload.user.userId,
      type: 'interlocutor',
      locale: locale(payload.request.locale)
    }
  };
}

// @param {Object} client
// @param {Object} payload Payload received from Alexa
// @param {Function} callback
function incoming(that.client, payload, callback) {
  return client.track(incomingPayload(payload), callback);
};

module.exports = incoming;
