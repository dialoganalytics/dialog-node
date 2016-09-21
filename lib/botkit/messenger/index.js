'use strict';

var uuid = require("uuid");
var Client = require("../../client");

// Creates a new client for the Dialog API with Botkit and Messenger support
module.exports = function(apiToken, botId) {
  this.client = new Client(apiToken, botId);

  // @param {Object} bot
  // @param {Object} message
  // @param {Function} next
  this.outgoingMiddleware = function(bot, message, next) {
    this.outgoing(message);
    next();
  };

  // @param {Object} bot
  // @param {Object} message
  // @param {Function} next
  this.incomingMiddleware = function(bot, message, next) {
    this.incoming(message);
    next();
  };

  // @param {Object} message
  this.outgoing = function(message) {
    var payload = {
      message: {
        conversation_distinct_id: message.channel,
        creator_distinct_id: this.botId,
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
    };

    return this.client.track(payload);
  };

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
    };

    return this.client.track(payload);
  };

  return this;
};
