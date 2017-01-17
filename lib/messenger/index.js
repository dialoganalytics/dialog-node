'use strict';

var locale = require("./locale");

var outgoingAttachment = require("./send/attachment");
var template = require("./send/template");
var text = require("./send/text");

var incomingAttachment = require("./webhook/attachment");
var message = require("./webhook/message");
var postback = require("./webhook/postback");
var quickReply = require("./webhook/quick_reply");

module.exports = {
  locale: locale,
  send: {
    attachment: outgoingAttachment,
    template: template,
    text: text
  },
  webhook: {
    attachment: incomingAttachment,
    postback: postback,
    message: message,
    quick_reply: quickReply
  }
};
