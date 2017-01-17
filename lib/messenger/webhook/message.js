'use strict';

// { sender: { id: '1134990723198922' },
//   recipient: { id: '240446676345364' },
//   timestamp: 1484596231307,
//   message: { mid: 'mid.1484596231307:a6cd03f409', seq: 159721, text: 'yo' },
//   alreadyProcessed: true }
//
// @see https://docs.dialoganalytics.com/reference/message/#text
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/
// @param {Object} payload
// @returns {Object}
function message(payload) {
  return {
    message: {
      distinct_id: payload.message.mid,
      mtype: 'text',
      properties: {
        text: payload.message.text
      }
    }
  };
};

module.exports = message;
