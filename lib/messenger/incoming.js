'use strict';

var merge = require("lodash.merge");
var forEach = require("lodash.foreach");

// @param {Object} event
// @returns {Object}
function incomingAuthentication(event) {
  return {
    message: {
      mtype: 'event',
      properties: {
        type: 'optin',
        ref: event.optin.ref
      }
    }
  };
}

// @param {Object} event
// @returns {Object}
function incomingQuickReply(event) {
  return {
    message: {
      mtype: 'quick_reply',
      properties: {
        text: event.message.quick_reply.payload
      }
    }
  };
}

// @param {Object} event
// @returns {Object}
function incomingAttachment(event) {
  var attachment = event.message.attachments[0];
  var props = {}

  if (attachment.type == 'location') {
    props = {
      lat: attachment.payload.coordinates.lat,
      lng: attachment.payload.coordinates.long
    };
  } else {
    props = { url: attachment.payload.url };
  };

  return {
    message: {
      mtype: attachment.type,
      properties: props
    }
  };
}

// @param {Object} event
// @returns {Object}
function incomingText(event) {
  return {
    message: {
      mtype: 'text',
      properties: {
        text: event.message.text
      }
    }
  };
}

// @param {Object} event
// @returns {Object}
function incomingPostback(event) {
  return {
    message: {
      mtype: 'event',
      properties: {
        type: 'postback',
        text: event.postback.payload
      }
    }
  };
}

// Authorization Event
// @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
// @param {Object} event
// @returns {Object}
function receivedAuthentication(event) {
  return incomingAuthentication(event);
};

// Message Event
// @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
// @param {Object} event
// @returns {Object, null}
function receivedMessage(event) {
  var message = event.message;

  var isEcho = message.is_echo;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    return; // noop
  } else if (quickReply) {
    return incomingQuickReply(event);
  }

  if (messageText) {
    return incomingText(event);
  } else if (messageAttachments) {
    return incomingAttachment(event);
  }
}

// Delivery Confirmation Event
// @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
// @param {Object} event
// @returns {Object}
function receivedDeliveryConfirmation(event) {
  // var senderID = event.sender.id;
  // var recipientID = event.recipient.id;
  // var delivery = event.delivery;
  // var messageIDs = delivery.mids;
  // var watermark = delivery.watermark;
  // var sequenceNumber = delivery.seq;
  //
  // if (messageIDs) {
  //   messageIDs.forEach(function(messageID) {
  //     console.log("Received delivery confirmation for message ID: %s",
  //       messageID);
  //   });
  // }
  //
  // console.log("All message before %d were delivered.", watermark);
}

// Postback Event
// @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
// @param {Object} event
// @returns {Object}
function receivedPostback(event) {
  return incomingPostback(event);
}

// Message Read Event
// @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
// @param {Object} event
// @returns {Object}
function receivedMessageRead(event) {
  // var senderID = event.sender.id;
  // var recipientID = event.recipient.id;
  //
  // // All messages before watermark (a timestamp) or sequence have been seen.
  // var watermark = event.read.watermark;
  // var sequenceNumber = event.read.seq;
  //
  // console.log("Received message read event for watermark %d and sequence " +
  //   "number %d", watermark, sequenceNumber);
}

// Account Link Event
// @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
// @param {Object} event
// @returns {Object}
function receivedAccountLink(event) {
  // var senderID = event.sender.id;
  // var recipientID = event.recipient.id;
  //
  // var status = event.account_linking.status;
  // var authCode = event.account_linking.authorization_code;
  //
  // console.log("Received account link event with for user %d with status %s " +
  //   "and auth code %s ", senderID, status, authCode);
}

// Incoming payload for Dialog API
// @param {Object} event
// @param {String} botId
// @returns {Object}
function incomingPayload(event, botId) {
  return {
    message: {
      platform: 'messenger',
      provider: 'dialog-node',
      mtype: null,
      sent_at: event.timestamp / 1000,
      properties: {}
    },
    conversation: {
      distinct_id: event.sender.id + '-' + botId
    },
    creator: {
      distinct_id: event.sender.id,
      type: 'interlocutor'
    }
  };
}

// @param {Object} client
// @param {Object} data Payload received from Facebook Webhook API
// @param {Function} callback
// @returns {Object, Null}
function incoming(client, data, callback) {
  forEach(data.entry, function(pageEntry) {
    // Iterate over each messaging event
    forEach(pageEntry.messaging, function(messagingEvent) {
      var payload = null;
      if (messagingEvent.optin) {
        payload = receivedAuthentication(messagingEvent);
      } else if (messagingEvent.message) {
        payload = receivedMessage(messagingEvent);
      } else if (messagingEvent.postback) {
        payload = receivedPostback(messagingEvent);
      } else if (messagingEvent.delivery) {
        // noop
      } else if (messagingEvent.read) {
        // noop
      } else if (messagingEvent.account_linking) {
        // noop
      } else {
        // noop
      }

      var response = null;
      if (payload) {
        var apiPayload = merge(incomingPayload(messagingEvent, client.botId), payload);

        response = client.track(apiPayload, callback);
      }

      return response;
    });
  });
}

module.exports = incoming;
