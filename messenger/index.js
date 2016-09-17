'use strict';

var Dialog = require("../dialog");

module.exports = function(apiToken, botId) {
  this.apiToken = apiToken;
  this.botId    = botId;

  this.outgoing = function() {
    // ...

    return Dialog.track(apiToken, botId, payload);
  },

  this.incoming = function() {
    // ...

    return Dialog.track(apiToken, botId, payload);
  }
};
