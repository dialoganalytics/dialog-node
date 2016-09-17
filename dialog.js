'use strict';

var request = require("request");
var defaultUserAgent = require("./user_agent");

module.exports = {

  track: function(apiToken, botId, payload) {
    var options = {
      url: 'https://api.dialoganalytics.com/v1/b/' + botId + '/track?token=' + apiToken,
      headers: {
        'User-Agent': defaultUserAgent
      },
      json: payload
    }

    function callback(error, response, body) {
        console.log(error);
        console.log(body);
    };

    return request.post(options, callback);
  }
};
