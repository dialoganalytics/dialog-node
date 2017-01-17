'use strict';

// @param {Object} payload
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/message/#text
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies
function text(payload) {
  return {
    message: {
      mtype: 'text',
      properties: {
        text: payload.message,
        quick_replies: payload.quick_replies
      }
    }
  };
};

module.exports = text;
