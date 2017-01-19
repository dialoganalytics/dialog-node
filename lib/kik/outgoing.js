// @param {Object} client
// @param {Object} message
function outgoing(client, message) {
  var payload = {
    message: {
      distinct_id: uuid.v4(),
      platform: 'kik',
      provider: 'dialog-node',
      sent_at: new Date().getTime() / 1000,
      properties: {}
    },
    conversation: {
      distinct_id: message.chatId
    },
    creator: {
      distinct_id: this.client.botId,
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
  };

  return client.track(payload);
};

module.exports = outgoing;
