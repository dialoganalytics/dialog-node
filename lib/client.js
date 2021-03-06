'use strict';

var request = require("request");
var defaultUserAgent = require("./user_agent");

// @constructor
// @param {String} apiToken the Dialog API token
// @param {String} botId the Dialog bot Id
function Client(apiToken, botId) {
  this.apiEndpoint = "https://api.dialoganalytics.com/v1/";
  this.apiToken = apiToken;
  this.botId = botId;
  this.userAgent = defaultUserAgent;
  this.context = {};
};
module.exports = Client;

// @param {Object} options Properties to merge with the track payload
// @returns {Object}
Client.prototype.attach = function(options) {
  if (typeOf(options) === 'string') {
    this.context = { message: { name: options }};
  } else {
    this.context = options;
  };
};

// @param {Object} payload Properties expected by the track API endpoint
// @param {Function} callback
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/track/
Client.prototype.track = function(payload, callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/track",
    json: Object.assign(payload, this.context)
  };

  this.context = {};

  return this.post(options, callback);
};

// Wraps an url into a trackable Dialog url
// @param {String} url
// @param {String} interlocutorDistinctId An interlocutor distinct Id provided by the platform or the provider
// @returns {String}
// @see https://docs.dialoganalytics.com/reference/click-tracking/
Client.prototype.link = function(url, interlocutorDistinctId) {
  return this.apiEndpoint + "b/" + this.botId + "/clicks/" + "?id=" + interlocutorDistinctId + "&url=" + encodeURIComponent(url);
};

// @param {String} name Event name
// @param {String} interlocutorDistinctId Interlocutor Id tied to the event
// @param {Object} properties Event properties
// @param {Function} callback
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/event#create
Client.prototype.event = function(name, interlocutorDistinctId, properties, callback) {
  this.createEvent({ name: name, created_at: new Date().getTime() / 1000, id: interlocutorDistinctId, properties: properties }, callback);
};

// @param {Object} params
// @param {Function} callback
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/event#create
Client.prototype.createEvent = function(params, callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/events/",
    json: { event: params }
  };

  this.post(options, callback);
};

// @param {String} conversationId Conversation Id
// @param {Function} callback
// @returns {Array}
// @see https://docs.dialoganalytics.com/reference/message#list
Client.prototype.listMessages = function(conversationId, callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/conversations/" + conversationId + "/messages"
  };

  this.get(options, callback);
};

// @param {String} conversationId Conversation Id
// @param {String} messageId Message Id
// @param {Function} callback
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/message#retrieve
Client.prototype.retrieveMessage = function(conversationId, messageId, callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/conversations/" + conversationId + "/messages/" + messageId
  };

  this.get(options, callback);
};

// @param {Function} callback
// @returns {Array}
// @see https://docs.dialoganalytics.com/reference/conversation#list
Client.prototype.listConversations = function(callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/conversations/"
  };

  this.get(options, callback);
};

// @param {String} conversationId Conversation Id
// @param {Function} callback
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/conversation#retrieve
Client.prototype.retrieveConversation = function(conversationId, callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/conversations/" + conversationId
  };

  this.get(options, callback);
};

// @param {Function} callback
// @returns {Array}
// @see https://docs.dialoganalytics.com/reference/interlocutor#list
Client.prototype.listInterlocutors = function(callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/interlocutors/"
  };

  this.get(options, callback);
};

// @param {String} interlocutorId Interlocutor Id
// @param {Function} callback
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/interlocutor#retrieve
Client.prototype.retrieveInterlocutor = function(interlocutorId, callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/interlocutors/" + interlocutorId
  };

  this.get(options, callback);
};

// @param {String} interlocutorId Interlocutor Id
// @param {Object} params
// @param {Function} callback
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/interlocutor#update
Client.prototype.updateInterlocutor = function(interlocutorId, params, callback) {
  var options = {
    url: this.apiEndpoint + "b/" + this.botId + "/interlocutors/" + interlocutorId,
    json: { interlocutor: params }
  };

  this.patch(options, callback);
};

// @param {Object} options
// @param {Function} callback
// @returns {Object}
Client.prototype.get = function(options, callback) {
  options.headers = {
    'User-Agent': this.defaultUserAgent,
    'Authorization': 'Token ' + this.apiToken
  };

  var callback = callback || function(error, response, body) {
    // noop
  };

  return request.get(options, callback);
};

// @param {Object} options
// @param {Function} callback
// @returns {Object}
Client.prototype.post = function(options, callback) {
  options.headers = {
    'User-Agent': this.defaultUserAgent,
    'Authorization': 'Token ' + this.apiToken
  };

  var callback = callback || function(error, response, body) {
    // noop
  };

  return request.post(options, callback);
};

// @param {Object} options
// @param {Function} callback
// @returns {Object}
Client.prototype.patch = function(options, callback) {
  options.headers = {
    'User-Agent': this.defaultUserAgent,
    'Authorization': 'Token ' + this.apiToken
  };

  var callback = callback || function(error, response, body) {
    // noop
  };

  return request.patch(options, callback);
};
