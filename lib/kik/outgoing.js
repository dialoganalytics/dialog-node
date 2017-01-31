'use strict';

// @param {Object} client
// @param {Object} message
// @param {Function} callback
// @returns {Object, Null}
function outgoing(client, message, callback) {
  var payload = {
    message: {
      platform: 'kik',
      provider: 'dialog-node',
      sent_at: new Date().getTime() / 1000,
      properties: {}
    },
    conversation: {
      distinct_id: message.chatId
    },
    creator: {
      distinct_id: client.botId,
      type: 'bot'
    }
  };

  if (message.type == 'text') {
    payload.message.mtype = 'text';
    payload.message.properties.text = message.body;
  } else if (message.type == 'picture') {
    payload.message.mtype = 'image';
    payload.message.properties.url = message.picUrl;
  } else if (message.type == 'sticker') {
    payload.message.mtype = 'sticker';
    payload.message.properties.url = message.stickerUrl;
  } else if (message.type == 'video') {
    payload.message.mtype = 'video';
    payload.message.properties.url = message.videoUrl;
  } else {
    console.log("Unknown message type: " + message.type)
  };

  var response = null;
  if (payload) {
    response = client.track(payload, callback);
  }

  return response;
};

module.exports = outgoing;
