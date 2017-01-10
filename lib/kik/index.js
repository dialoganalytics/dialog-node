'use strict';

var uuid = require("uuid");
var Client = require("../client");

// Creates a new client for the Dialog API with kikinteractive/kik-node support
module.exports = function(apiToken, botId) {
  var that = this;

  this.client = new Client(apiToken, botId);

  // @param {Object} message
  // @param {Function} next
  this.outgoingMiddleware = function(message, next) {
    that.outgoing(message);
    next();
  };

  // @param {Object} message
  // @param {Function} next
  this.incomingMiddleware = function(message, next) {
    that.incoming(message);
    next();
  };

  // @param {Object} message
  this.incoming = function(message) {
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

    return this.client.track(payload);
  };

  // @param {Object} message
  this.outgoing = function(message) {
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

    return this.client.track(payload);
  };

  return this;
};
