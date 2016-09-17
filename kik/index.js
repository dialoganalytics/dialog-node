var uuid = require("uuid");
var Dialog = require("../dialog");

module.exports = function(apiToken, botId) {
  this.apiToken = apiToken;
  this.botId = botId;

  this.incoming = function(message) {
    var payload = {
      message: {
        conversation_distinct_id: message.chatId,
        creator_distinct_id: message.from,
        distinct_id: message.id,
        platform: 'kik',
        provider: 'kik',
        mtype: message.type,
        sent_at: message.timestamp / 1000,
        properties: {
          text: message.body
        }
      }
    };

    return Dialog.track(apiToken, botId, payload);
  },

  this.outgoing = function(message) {
    var payload = {
      message: {
        conversation_distinct_id: message.chatId,
        distinct_id: uuid.v4(),
        platform: 'kik',
        provider: 'kik',
        mtype: message.type,
        sent_at: new Date().getTime(),
        properties: {
          text: message.body
        }
      }
    };

    return Dialog.track(apiToken, botId, payload);
  }
};
