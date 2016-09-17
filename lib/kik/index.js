var uuid = require("uuid");
var Dialog = require("../dialog");

// Creates a new client for the Dialog API with kikinteractive/kik-node support
//
// @param {string} apiToken the Dialog API token
// @param {string} botId the Dialog bot Id
module.exports = function(apiToken, botId) {
  this.apiToken = apiToken;
  this.botId = botId;

  // @param {Object} message
  this.incoming = function(message) {
    var payload = {
      message: {
        conversation_distinct_id: message.chatId,
        creator_distinct_id: message.from,
        creator_type: 'Interlocutor',
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

  // @param {Object} message
  this.outgoing = function(object) {
    var payload = {
      message: {
        conversation_distinct_id: object.chatId,
        creator_distinct_id: botId,
        creator_type: 'Bot',
        distinct_id: uuid.v4(),
        platform: 'kik',
        provider: 'kik',
        mtype: object.type,
        sent_at: new Date().getTime() / 1000,
        properties: {
          text: object.body
        }
      }
    };

    return Dialog.track(apiToken, botId, payload);
  }
};
