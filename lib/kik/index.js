'use strict';

var uuid = require("uuid");
var Client = require("../client");

var incomingHandler = require("./incoming");
var outgoingHandler = require("./outgoing");

// Creates a new client for the Dialog API with kikinteractive/kik-node support
module.exports = function(apiToken, botId) {
  var that = this;

  this.client = new Client(apiToken, botId);

  // @param {Object} message
  // @param {Function} next
  // @param {Function} callback
  this.outgoingMiddleware = function(message, next, callback) {
    that.outgoingHandler(that.client, message, callback);
    next();
  };

  // @param {Object} message
  // @param {Function} next
  // @param {Function} callback
  this.incomingMiddleware = function(message, next, callback) {
    that.incomingHandler(that.client, message, callback);
    next();
  };

  return this;
};
