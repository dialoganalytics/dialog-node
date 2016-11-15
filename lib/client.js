'use strict';

var request = require("request");
var defaultUserAgent = require("./user_agent");

// @constructor
// @param {string} apiToken the Dialog API token
// @param {string} botId the Dialog bot Id
function Client(apiToken, botId) {
  this.apiEndpoint = "https://api.dialoganalytics.com/v1/";
  this.apiToken = apiToken;
  this.botId = botId;
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

// @param {String} conversationId
// @returns
// @see https://docs.dialoganalytics.com/reference/message#list
Client.prototype.listMessages = function(conversationId) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/conversations/" + conversationId + "/messages"
  };

  this.get(options);
};

// @param {String} conversationId
// @param {String} messageId
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/message#retrieve
Client.prototype.retrieveMessage = function(conversationId, messageId) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/conversations/" + conversationId + "/messages/" + messageId
  };

  this.get(options);
};

// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/conversation#list
Client.prototype.listConversations = function() {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/conversations/"
  };

  this.get(options);
};

// @param {String} conversationId
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/conversation#retrieve
Client.prototype.retrieveConversation = function(conversationId) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/conversations/" + conversationId
  };

  this.get(options);
};

// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/interlocutor#list
Client.prototype.listInterlocutors = function() {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/interlocutors/"
  };

  this.get(options);
};

// @param {String} interlocutorId
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/interlocutor#retrieve
Client.prototype.retrieveInterlocutor = function(interlocutorId) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/interlocutors/" + interlocutorId
  };

  this.get(options);
};

// @param {Object} params
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/interlocutor#create
Client.prototype.createInterlocutor = function(params) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/interlocutors/",
    json: { interlocutor: params }
  };

  this.post(options);
};

// @param {Object} options
// @param {Function} callback
// @returns {Object}
Client.prototype.get = function(options, callback) {
  options.headers = {
    'User-Agent': this.defaultUserAgent,
    'Authorization': 'Api-Key ' + this.apiToken
  };

  var callback = function(error, response, body) {
    // console.log(error)
    // console.log(response)
    console.log(body)
  };

  return request.get(options, callback);
};

// @param {Object} options
// @param {Function} callback
// @returns {Object}
Client.prototype.post = function(options, callback) {
  options.headers = {
    'User-Agent': this.defaultUserAgent,
    'Authorization': 'Api-Key ' + this.apiToken
  };

    console.log(response.body)
  var callback = function(error, response, body) {
  };

  return request.post(options, callback);
};
