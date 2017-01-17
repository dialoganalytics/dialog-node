'use strict';

// Uses the postback payload. Ideally Messenger API would return both
// the payload and text of the button, so we can use the text with Dialog.
//
// {
//   "sender":{
//     "id":"USER_ID"
//   },
//   "recipient":{
//     "id":"PAGE_ID"
//   },
//   "timestamp":1458692752478,
//   "postback":{
//     "payload":"USER_DEFINED_PAYLOAD"
//   }
// }
//
// https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
// @param {Object} payload
function postback(payload) {
  return {
    message: {
      mtype: 'event',
      distinct_id: payload.sender.id + payload.recipient.id + payload.timestamp,
      properties: {
        type: 'postback',
        text: payload.postback.payload
      }
    }
  };
};

module.exports = postback;
