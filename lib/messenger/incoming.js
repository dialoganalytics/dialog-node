'use strict';

var merge = require("lodash.merge");

// @param {Object} event
function incomingAuthentication(event) {
  return {
    message: {
      distinct_id: '...',
      mtype: 'event',
      properties: {
        type: 'optin',
        ref: event.optin.ref
      }
    }
  };
}

// @param {Object} event
function incomingQuickReply(event) {
  return {
    message: {
      distinct_id: event.message.mid,
      mtype: 'quick_reply',
      properties: {
        text: event.message.quick_reply.payload
      }
    }
  };
}

// @param {Object} event
function incomingAttachment(event) {
  return {
    message: {
      distinct_id: event.message.mid,
      mtype: event.message.payload.type,
      properties: {
        url: event.message.payload.url
      }
    }
  };
}

// @param {Object} event
function incomingText(event) {
  return {
    message: {
      distinct_id: event.message.mid,
      mtype: 'text',
      properties: {
        text: event.message.text
      }
    }
  };
}

// @param {Object} event
function incomingPostback(event) {
  return {
    message: {
      distinct_id: '...',
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
function receivedAuthentication(event) {
  return incomingAuthentication(event);
};

// Message Event
// @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
// @param {Object} event
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
function receivedPostback(event) {
  return incomingPostback(event);
}

// Message Read Event
// @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
// @param {Object} event
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
function incomingPayload(event, botId) {
  return {
    message: {
      distinct_id: null,
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
function incoming(client, data) {
  data.entry.forEach(function(pageEntry) {
    // Iterate over each messaging event
    pageEntry.messaging.forEach(function(messagingEvent) {
      console.log("***************************************")
      var payload = null;
      if (messagingEvent.optin) {
        payload = receivedAuthentication(messagingEvent);
      } else if (messagingEvent.message) {
        payload = receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          // payload = receivedDeliveryConfirmation(messagingEvent); TODO
      } else if (messagingEvent.postback) {
        payload = receivedPostback(messagingEvent);
      } else if (messagingEvent.read) {
        // payload = receivedMessageRead(messagingEvent); TODO
      } else if (messagingEvent.account_linking) {
        // payload = receivedAccountLink(messagingEvent); TODO
      } else {
        console.log("Unknown messagingEvent: ", messagingEvent);
      }

      var response = null;
      if (payload) {
        response = client.track(merge(incomingPayload(messagingEvent, client.botId), payload));
      }

      return response;
    });
  });
}

module.exports = incoming;
