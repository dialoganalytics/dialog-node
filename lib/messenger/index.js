'use strict';

var Client = require("../client");

var incomingHandler = require("./incoming");
var outgoingHandler = require("./outgoing");

module.exports = function(apiToken, botId) {
  var that = this;

  this.client = new Client(apiToken, botId);

  this.incoming = function(payload, callback) {
    incomingHandler(that.client, payload, callback)
  };

  this.outgoing = function(payload, response, callback) {
    outgoingHandler(that.client, payload, response, callback)
  };

  return this;
};
