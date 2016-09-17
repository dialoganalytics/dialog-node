'use strict';

var request = require("request");

module.exports = {

  track: function(apiToken, botId, payload) {
    var options = {
      url: 'https://api.dialoganalytics.com/v1/b/' + botId + '/track?token=' + apiToken,
      json: payload
    }

    function callback(error, response, body) {
        console.log(error);
        console.log(body);
    };

    return request.post(options, callback);
  }
};
