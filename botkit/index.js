'use strict';

var Dialog = require("../dialog")

module.exports = function(apiToken, botId) {
  this.apiToken = apiToken;
  this.botId    = botId;

  outgoing: function() {
    // ...

    Dialog.track(apiToken, botId, payload);
  },

  incoming: function() {
    // ...

    Dialog.track(apiToken, botId, payload);
  }
}
