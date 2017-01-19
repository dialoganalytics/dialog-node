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
    that.outgoing(that.client, message);
    next();
  };

  // @param {Object} message
  // @param {Function} next
  this.incomingMiddleware = function(message, next) {
    that.incoming(that.client, message);
    next();
  };
  
  return this;
};
