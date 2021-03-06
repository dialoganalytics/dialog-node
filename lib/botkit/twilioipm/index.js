'use strict';

var Client = require("../../client");

// Creates a new client for the Dialog API with Botkit and Twilio IP Messaging support
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
  // @returns {Object}
  this.outgoing = function(message) {
    var payload = {
      message: {
        platform: 'twilio',
        provider: 'dialog-node/botkit',
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
  // @returns {Object}
  this.incoming = function(message) {
    var payload = {
      message: {
        platform: 'twilio',
        provider: 'dialog-node/botkit',
        mtype: 'text',
        sent_at: Date.parse(message.DateCreated) / 1000,
        properties: {
          text: message.text
        }
      },
      conversation: {
        distinct_id: message.channel
      },
      creator: {
        distinct_id: message.from,
        type: 'interlocutor'
      }
    };

    return this.client.track(payload);
  };

  return this;
};
