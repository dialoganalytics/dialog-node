'use strict';

var request = require("request");

module.exports = {

  track: function(apiToken, botId, payload) {
    var endpoint = 'https://api.dialoganalytics.com/v1/b/' + botId + '/track?token=' + apiToken;

    return request({ method: 'POST', uri: endpoint, json: payload });
  }
};
