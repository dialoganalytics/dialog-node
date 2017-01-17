'use strict';

var pick = require("lodash.pick");

// @see https://docs.dialoganalytics.com/reference/message/#url-button
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/url-button
// @param {Object} payload
// @returns {Object}
function url(payload) {
  return {
    type: 'url',
    title: payload.title,
    url: payload.url
  };
};

// @see https://docs.dialoganalytics.com/reference/message/#postback-button
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/postback-button
// @param {Object} payload
// @returns {Object}
function postback(payload) {
  return pick(payload, 'type', 'title');
};

// @see https://docs.dialoganalytics.com/reference/message/#call-button
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/call-button
// @param {Object} payload
// @returns {Object}
function call(payload) {
  return pick(payload, 'type', 'title', 'payload');
};

// @see https://docs.dialoganalytics.com/reference/message/#share-button
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/share-button
// @param {Object} payload
function share(payload) {
  return {
    type: 'share'
  };
};

// @see https://docs.dialoganalytics.com/reference/message/#buy-button
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/buy-button
// @param {Object} payload
// @returns {Object}
function buy(payload) {
  return payload;
};

// Adapter
function button(payload) {
  var payloadFunc = {
    web_url: url,
    postback: postback,
    phone_number: call,
    share: share,
    payment: buy,
  }[payload.type];

  if (payloadFunc) {
    return payloadFunc(payload);
  } else {
    return payload;
  };
};

module.exports = button;
