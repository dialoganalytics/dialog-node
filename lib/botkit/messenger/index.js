'use strict';

var uuid = require("uuid");
var Dialog = require("../../dialog");

module.exports = function(apiToken, botId) {
  var that = this;

  this.apiToken = apiToken;
  this.botId    = botId;

  // @param {Object} bot
  // @param {Object} message
  // @param {Function} next
  this.outgoingMiddleware = function(bot, message, next) {
    that.outgoing(message);
    next();
  },

  // @param {Object} bot
  // @param {Object} message
  // @param {Function} next
  this.incomingMiddleware = function(bot, message, next) {
    that.incoming(message);
    next();
  },

  // @param {Object} message
  this.outgoing = function(message) {
    var payload = {
      message: {
        conversation_distinct_id: message.channel,
        creator_distinct_id: botId,
        creator_type: 'bot',
        distinct_id: uuid.v4(),
        platform: 'messenger',
        provider: 'messenger',
        mtype: 'text',
        sent_at: new Date().getTime() / 1000,
        properties: {
          text: message.text
        }
      }
    }

    return Dialog.track(apiToken, botId, payload);
  },

  // @param {Object} message
  this.incoming = function(message) {
    var payload = {
      message: {
        conversation_distinct_id: message.channel,
        creator_distinct_id: message.user,
        creator_type: 'interlocutor',
        distinct_id: message.mid,
        platform: 'messenger',
        provider: 'messenger',
        mtype: 'text',
        sent_at: message.timestamp / 1000,
        properties: {
          text: message.text
        }
      }
    }

    return Dialog.track(apiToken, botId, payload);
  }
};
