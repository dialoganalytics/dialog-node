'use strict';

var map = require("lodash.map");
var merge = require("lodash.merge");
var pick = require("lodash.pick");
var button = require("./../button");

// @param {Object} payload
// @returns {Object}
function genericElement(payload) {
  return payload;
};

// @param {Object} payload
// @returns {Object}
function listElement(payload) {
  return payload;
};

// @param {Object} payload
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/message/#button-template
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template
function buttonTemplate(payload) {
  return {
    message: {
      mtype: 'template',
      properties: {
        type: payload.payload.template_type,
        text: payload.payload.text,
        buttons: map(payload.payload.buttons, button)
      }
    }
  };
};

// @param {Object} payload
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/message/#generic-template
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template
function genericTemplate(payload) {
  return {
    message: {
      mtype: 'template',
      properties: {
        type: payload.payload.template_type,
        elements: map(payload.payload.elements, genericElement)
      }
    }
  };
};

// @param {Object} payload
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/message/#list-template
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template
function listTemplate(payload) {
  return {
    message: {
      mtype: 'template',
      properties: {
        type: payload.payload.template_type,
        buttons: map(payload.payload.buttons, button),
        elements: map(payload.payload.elements, listElement)
      }
    }
  };
};

// @param {Object} payload
// @returns {Object}
// @see https://docs.dialoganalytics.com/reference/message/#receipt-template
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/receipt-template
function receiptTemplate(payload) {
  var attributes = ['recipient_name', 'order_number', 'currency', 'payment_method',
    'order_url', 'timestamp', 'elements', 'address', 'summary', 'adjustments'];

  return {
    message: {
      mtype: 'template',
      properties: merge({ type: payload.payload.template_type }, pick(payload.payload, attributes))
    }
  };
};

// Adapter
// @param {Object} payload
// @returns {Object}
function template(payload) {
  return {
    button: buttonTemplate,
    generic: genericTemplate,
    list: listTemplate,
    receipt: receiptTemplate,
  }[payload.payload.template_type](payload);
};

module.exports = template;
