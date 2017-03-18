'use strict';

{
  "version": "1.0",
  "response": {
    // "outputSpeech": {
    //   "type": "SSML",
    //   "ssml": "<speak> Hello World! </speak>"
    // },
    "outputSpeech": {
      "type": "PlainText",
      "text": "I think Nick is a good old pal"
    },
    "card": {
      "content": "I think Nick is a good old pal",
      "title": "Dialog",
      "type": "Simple"
    },
    "shouldEndSession": false
  },
  "sessionAttributes": {}
}

function outgoingPayload(payload) {
  return {
    message: {
      distinct_id: ,
      provider: ,
      platform: ,
      mtype: 'text',
      sent_at: ,
      properties: {

      }
    },
    conversation: {
      distinct_id:
    },
    creator: {
      distinct_id: '',
      type: 'bot'
    }
  };
}

// @param {Object} client
// @param {Object} data Payload sent to Alexa API
// @param {Object} event Response from Alexa API
// @param {Function} callback
function outgoing(that.client, payload, response, callback) {
  return client.track(outgoingPayload(payload), callback);
};

module.exports = outgoing;
