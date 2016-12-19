'use strict';

var uuid = require("uuid");
var Client = require("../../client");

// Creates a new client for the Dialog API with Botkit and Messenger support
module.exports = function(apiToken, botId) {
  var that = this;

  this.client = new Client(apiToken, botId);

  // @param {Object} bot
  // @param {Object} message
  // @param {Function} next
  this.outgoingMiddleware = function(bot, message, next) {
    that.outgoing(message);
    next();
  };

  // @param {Object} bot
  // @param {Object} message
  // @param {Function} next
  this.incomingMiddleware = function(bot, message, next) {
    that.incoming(message);
    next();
  };

  // @param {Object} message
  this.outgoing = function(message) {
    var payload = {
      message: {
        distinct_id: uuid.v4(),
        platform: 'messenger',
        provider: 'botkit',
        mtype: 'text',
        sent_at: new Date().getTime() / 1000,
        properties: {
          text: message.text
        }
      },
      conversation: {
        distinct_id: message.channel
      },
      creator: {
        distinct_id: this.client.botId,
        type: 'bot'
      }
    };

    return this.client.track(payload);
  };

  // @param {Object} message
  this.incoming = function(message) {
    var payload = {
      message: {
        distinct_id: message.mid,
        platform: 'messenger',
        mtype: 'text',
        provider: 'botkit',
        sent_at: message.timestamp / 1000,
        properties: {
          text: message.text
        }
      },
      conversation: {
        distinct_id: message.channel
      },
      creator: {
        distinct_id: message.user,
        type: 'interlocutor'
      }
    };

    return this.client.track(payload);
  };

  return this;
};
