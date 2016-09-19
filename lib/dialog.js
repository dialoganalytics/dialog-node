'use strict';

var request = require("request");
var defaultUserAgent = require("./user_agent");

module.exports = {

  // @param {string} apiToken the Dialog API token
  // @param {string} botId the Dialog bot Id
  // @param {Object} payload Properties expected by the track API endpoint
  //   see https://docs.dialoganalytics.com/reference/track/
  track: function(apiToken, botId, payload) {
    if (!apiToken) {
      throw new Error('Please configure Dialog with a valid API token first');
    };

    var options = {
      url: 'https://api.dialoganalytics.com/v1/b/' + botId + '/track',
      headers: {
        'User-Agent': defaultUserAgent,
        'Authorization': 'Api-Key ' + apiToken
      },
      json: payload
    }

    function callback(error, response, body) {};

    return request.post(options, callback);
  }
};
