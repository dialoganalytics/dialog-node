'use strict';

var uuid = require("uuid");
var Client = require("../client");

// Creates a new client for the Dialog API with kikinteractive/kik-node support
module.exports = function(apiToken, botId) {
  this.client = new Client(apiToken, botId);

  // @param {Object} message
  this.incoming = function(message) {
    var payload = {
      message: {
        conversation_distinct_id: message.chatId,
        creator_distinct_id: message.from,
        creator_type: 'interlocutor',
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

    return this.client.track(payload);
  };

  // @param {Object} message
  this.outgoing = function(message) {
    var payload = {
      message: {
        conversation_distinct_id: message.chatId,
        creator_distinct_id: this.botId,
        creator_type: 'bot',
        distinct_id: uuid.v4(),
        platform: 'kik',
        provider: 'kik',
        mtype: message.type,
        sent_at: new Date().getTime() / 1000,
        properties: {
          text: message.body
        }
      }
    };

    return this.client.track(payload);
  };

  return this;
};
