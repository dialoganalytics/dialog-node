'use strict';

var Client = require("../client");

var incomingHandler = require("./incoming");
var outgoingHandler = require("./outgoing");

module.exports = function(apiToken, botId) {
  var that = this;

  this.client = new Client(apiToken, botId);

  this.incoming = function(payload) {
    incomingHandler(that.client, payload)
  };

  this.outgoing = function(payload, response) {
    outgoingHandler(that.client, payload, response)
  };

  return this;
};
