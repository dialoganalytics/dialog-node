'use strict';

// Handles image, audio, video and file attachments
//
// @param {Object} payload
// @returns {Object}
function attachment(payload) {
  return {
    message: {
      mtype: payload.type,
      properties: {
        url: payload.url
      }
    }
  };
};

module.exports = attachment;
