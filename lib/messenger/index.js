'use strict';

var Dialog = require("../dialog");

module.exports = function(apiToken, botId) {
  this.apiToken = apiToken;
  this.botId    = botId;

  // @param {Object} response
  this.outgoing = function(payload) {
    return Dialog.track(apiToken, botId, payload);
  },

  // @param {Object} payload
  this.incoming = function(payload) {
    return Dialog.track(apiToken, botId, payload);
  }
};
