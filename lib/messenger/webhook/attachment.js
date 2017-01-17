'use strict';

// Handles image, audio, video and file attachments
// @note Only the first attachment is considered
//
// { sender: { id: '1134990723198922' },
//   recipient: { id: '240446676345364' },
//   timestamp: 1484597197730,
//   message:
//    { mid: 'mid.1484597197730:0093ee9976',
//      seq: 159745,
//      attachments:
//       [ { type: 'audio',
//           payload: { url: 'https://cdn.fbsbx.com/v/t59.3654-21/15913653_10158097066130230_4461284398389526528_n.mp4/audioclip-1484597196000-511.mp4?oh=995d094b0f1103c955fd7f6a3bda2e73&oe=587FB419' } } ] },
//   alreadyProcessed: true }
//
// @param {Object} payload
// @returns {Object}
function attachment(payload) {
  return {
    message: {
      distinct_id: payload.message.mid,
      mtype: payload.message.attachments[0].type,
      properties: {
        url: payload.message.attachments[0].payload.url,
        // quick_replies: payload.quick_replies // TODO
      }
    }
  };
};

module.exports = attachment;
