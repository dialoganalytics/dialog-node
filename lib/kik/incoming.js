// @param {Object} client
// @param {Object} message
function incoming(client, message) {
  var payload = {
    message: {
      distinct_id: message.id,
      platform: 'kik',
      provider: 'dialog-node',
      sent_at: message.timestamp / 1000,
      properties: {}
    },
    conversation: {
      distinct_id: message.chatId,
    },
    creator: {
      distinct_id: message.from,
      type: 'interlocutor'
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
  };

  return client.track(payload);
};

module.exports = incoming;