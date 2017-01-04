# Dialog Node

A node.js client for the [Dialog](https://dialoganalytics.com) API.

[![Dependency Status](https://gemnasium.com/badges/github.com/dialoganalytics/dialog-node.svg)](https://gemnasium.com/github.com/dialoganalytics/dialog-node)
[![NPM Version](http://img.shields.io/npm/v/dialog-api.svg)](https://www.npmjs.org/package/dialog-api)

## Examples

- Amazon Alexa (soon)
- Google Actions (soon)
- [Facebook Messenger with Botkit](https://github.com/dialoganalytics/botkit-messenger-example)
- [Twilio Programmable Chat with Botkit](https://github.com/dialoganalytics/botkit-twilio-ipm-example)
- Twilio SMS (soon)
- Facebook Messenger (soon)
- [Kik](https://github.com/dialoganalytics/kik-node-example)
- [Botpress](https://github.com/dialoganalytics/botpress-example)

## Installation

Install using [npm](https://www.npmjs.com/package/dialog-api).

```bash
npm install dialog-api --save
```

## Usage

This library needs to be configured with your API token which is available in your [personal account](http://app.dialoganalytics.com/users/edit), and a bot ID.

```js
// Framework specific
var Dialog = require('dialog-api/lib/botkit/messenger');
var Dialog = require('dialog-api/lib/botkit/twilioipm');
var Dialog = require('dialog-api/lib/messenger'); // coming soon
var Dialog = require('dialog-api/lib/kik');

// Generic
var Dialog = require('dialog-api');

var dialog = new Dialog(request.env('DIALOG_API_TOKEN'), request.env('DIALOG_BOT_ID'));
```

### Tracking messages

#### Generic

See [docs.dialoganalytics.com/reference/track](https://docs.dialoganalytics.com/reference/track/)

```js
var payload = {
  message: {
    distinct_id: "81694d37-8f69-422e-80a6-7d5df749ef6a",
    platform: "messenger",
    provider: "messenger",
    mtype: "text",
    sent_at: 1482332833.034,
    properties: {
      text: "Hello world"
    }
  },
  conversation: {
    distinct_id: "48548268-2b08-4db4-9ade-2feb535227db"
  },
  creator: {
    distinct_id: "960e4275-bb4d-473b-a21d-cadb3701bf3f",
    type: "interlocutor"
  }
};

dialog.track(payload)
```

#### Messenger with Botkit

Example [Messenger bot built with Botkit](https://github.com/dialoganalytics/botkit-messenger-example)

```js
controller.middleware.receive.use(dialog.incomingMiddleware);
controller.middleware.send.use(dialog.outgoingMiddleware);
```

#### Twilio Programmable Chat (IP Messaging) with Botkit

Example [Twilio Programmable Chat bot built with Botkit](https://github.com/dialoganalytics/botkit-twilio-ipm-example)

```js
controller.middleware.receive.use(dialog.incomingMiddleware);
controller.middleware.send.use(dialog.outgoingMiddleware);
```

#### Messenger

Coming soon

#### Kik with @kikinteractive/kik

Example [Kik bot built with @kikinteractive/kik](https://github.com/dialoganalytics/kik-node-example)

```js
// ...
bot.use(function(message, next) {
  dialog.incomingMiddleware(message, next);
});

bot.outgoing(function(message, next) {
  dialog.outgoingMiddleware(message, next);
});
```

### Tracking clicks

Track links (or anything with a URL) clicked by users inside a conversation. See [docs.dialoganalytics.com/reference/click-tracking](https://docs.dialoganalytics.com/reference/click-tracking/)

```js
var link = {
  "type": "web_url",
  "url": dialog.link('http://example.com'), // https://api.dialoganalytics.com/v1/click/botId?url=http%3A%2F%2Fexample.com
  "title": "View Item"
}
```

### Messages

Retrieve a message. See [docs.dialoganalytics.com/reference/message#retrieve](https://docs.dialoganalytics.com/reference/message#retrieve)

```js
dialog.retrieveMessage(conversationId, messageId);
```

List all messages in a conversation. See [docs.dialoganalytics.com/reference/message#list](https://docs.dialoganalytics.com/reference/message#list)

```js
dialog.listMessages(conversationId);
```

### Conversations

Retrieve a conversation. See [docs.dialoganalytics.com/reference/conversation#retrieve](https://docs.dialoganalytics.com/reference/conversation#retrieve)

```js
dialog.retrieveConversation(conversationId);
```

List all conversations. See [docs.dialoganalytics.com/reference/conversation#list](https://docs.dialoganalytics.com/reference/conversation#list)

```js
dialog.listConversations();
```

### Interlocutors

Retrieve an interlocutor. See [docs.dialoganalytics.com/reference/interlocutor#retrieve](https://docs.dialoganalytics.com/reference/interlocutor#retrieve)

```js
dialog.retrieveInterlocutor(interlocutorId);
```

List all interlocutors. See [docs.dialoganalytics.com/reference/interlocutor#list](https://docs.dialoganalytics.com/reference/interlocutor#list)

```js
dialog.listInterlocutors();
```

Create an interlocutor. See [docs.dialoganalytics.com/reference/interlocutor#create](https://docs.dialoganalytics.com/reference/interlocutor#create)

```js
dialog.createInterlocutor(params);
```

## Documentation

See the [API docs](https://docs.dialoganalytics.com).
