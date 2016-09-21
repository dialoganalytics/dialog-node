'use strict';

var Client = require("./lib/client");

module.exports = function(apiToken, botId) {
  return new Client(apiToken, botId);
};

module.exports.Client = Client;
