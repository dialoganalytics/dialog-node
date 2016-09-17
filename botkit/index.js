'use strict';

var Dialog = require("../dialog")

module.exports = function(apiToken, botId) {
  this.apiToken = apiToken;
  this.botId    = botId;

  outgoing: function() {
    // ...

    return Dialog.track(apiToken, botId, payload);
  },

  incoming: function() {
    // ...

    return Dialog.track(apiToken, botId, payload);
  }
}
