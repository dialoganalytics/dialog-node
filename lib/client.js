'use strict';

var request = require("request");
var defaultUserAgent = require("./user_agent");

// @constructor
// @param {string} apiToken the Dialog API token
// @param {string} botId the Dialog bot Id
function Client(apiToken, botId) {
  this.apiEndpoint = "https://api.dialoganalytics.com/v1/";
  this.apiToken = apiToken;
  this.userAgent = defaultUserAgent;
};
module.exports = Client;

// @param {Object} payload Properties expected by the track API endpoint
// @param {Function} callback
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/track/
Client.prototype.track = function(payload, callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/track",
    json: payload
  };

  return this.post(options, callback);
};

// @param {String} url
// @returns {String}
// @see https://docs.dialoganalytics.com/reference/click-tracking/
Client.prototype.link = function(url) {
  return this.apiEndpoint + "click/" + this.botId + "?url=" + encodeURIComponent(url);
};

// @param {Object} options
// @param {Function} callback
// @returns {Object}
Client.prototype.post = function(options, callback) {
  options.headers = {
    'User-Agent': this.defaultUserAgent,
    'Authorization': 'Api-Key ' + this.apiToken
  };

  var callback = function(error, response) {
    console.log(response.body)
  };

  return request.post(options, callback);
};
