'use strict';

// @param {Object} payload
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/message/#quick-reply
function quickReply(payload) {
  return {
    message: {
      distinct_id: payload.message.mid,
      mtype: 'quick_reply',
      properties: {
        text: payload.message.text
      }
    }
  };
};

module.exports = quickReply;
