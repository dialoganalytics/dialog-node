'use strict';

var map = require("lodash.map");
var merge = require("lodash.merge");
var pick = require("lodash.pick");
var button = require("./button");

// @param {Object} element
// @returns {Object}
function genericElement(element) {
  return element;
};

// @param {Object} element
// @returns {Object}
function listElement(element) {
  return element;
};

// @see https://docs.dialoganalytics.com/reference/message/#button-template
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template
// @param {Object} message
// @returns {Object}
function buttonTemplate(message) {
  var template = message.attachment.payload;

  return {
    message: {
      mtype: 'template',
      properties: {
        type: template.template_type,
        text: template.text,
        buttons: map(template.buttons, button)
      }
    }
  };
};

// @see https://docs.dialoganalytics.com/reference/message/#generic-template
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template
// @param {Object} message
// @returns {Object}
function genericTemplate(message) {
  var template = message.attachment.payload;

  return {
    message: {
      mtype: 'template',
      properties: {
        type: template.template_type,
        elements: map(template.elements, genericElement)
      }
    }
  };
};

// @see https://docs.dialoganalytics.com/reference/message/#list-template
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template
// @param {Object} message
// @returns {Object}
function listTemplate(message) {
  var template = message.attachment.payload;

  return {
    message: {
      mtype: 'template',
      properties: {
        type: template.template_type,
        buttons: map(template.buttons, button),
        elements: map(template.elements, listElement)
      }
    }
  };
};

// @see https://docs.dialoganalytics.com/reference/message/#receipt-template
// @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/receipt-template
// @param {Object} message
// @returns {Object}
function receiptTemplate(message) {
  var template = message.attachment.payload;

  var attributes = ['recipient_name', 'order_number', 'currency', 'payment_method',
    'order_url', 'timestamp', 'elements', 'address', 'summary', 'adjustments'];

  return {
    message: {
      mtype: 'template',
      properties: merge({ type: template.template_type }, pick(template, attributes))
    }
  };
};

// @param {Object} message
// @returns {Object}
function templateMessage(message) {
  var type = message.attachment.payload.template_type;

  if (type == 'button') {
    return buttonTemplate(message);
  } else if(type == 'generic') {
    return genericTemplate(message);
  } else if(type == 'list') {
    return listTemplate(message);
  } else if(type == 'receipt') {
    return receiptTemplate(message);
  } else {
    console.log("Unknown template type: " + type)
    return {};
  }
}

// Handles image, audio, video and file attachments
// @param {Object} message
// @returns {Object}
function attachmentMessage(message) {
  return {
    message: {
      mtype: message.attachment.type,
      properties: {
        url: message.attachment.payload.url
      }
    }
  };
}

// @param {Object} message
// @returns {Object}
function textMessage(message) {
  return {
    message: {
      mtype: 'text',
      properties: {
        text: message.text,
        quick_replies: message.quick_replies
      }
    }
  };
}

// @param {Object} data
// @returns {Object}
function senderActionMessage(data) {
  // TODO
  // return {
  //   message: {
  //     mtype: ,
  //     properties: {}
  // };
}

// Outgoing payload for Dialog API
// @param {Object} event
// @param {String} botId
// @returns {Object}
function outgoingPayload(event, botId) {
  return {
    message: {
      platform: 'messenger',
      provider: 'dialog-node',
      mtype: null,
      sent_at: new Date().getTime() / 1000,
      properties: {}
    },
    conversation: {
      distinct_id: event.recipient_id + '-' + botId
    },
    creator: {
      distinct_id: botId,
      type: 'bot'
    }
  };
}

// @param {Object} client
// @param {Object} data Payload sent to Facebook Send API
// @param {Object} event Response from Facebook API
// @param {Function} callback
// @returns {Object, Null}
function outgoing(client, data, event, callback) {
  var payload = null;

  if (data.message) {
    var message = data.message;

    if (message.attachment) {
      if(message.attachment.type == 'template') {
        payload = templateMessage(message);
      } else {
        payload = attachmentMessage(message);
      }
    } else if (message.text) {
      payload = textMessage(message);
    }
  } else if (data.sender_action) {
    // noop
  } else {
    console.log("Unknown data: ", data);
  }

  var response = null;
  if (payload) {
    var apiPayload = merge(outgoingPayload(event, client.botId), payload);

    response = client.track(apiPayload, callback);
  }

  return response;
}

module.exports = outgoing;
