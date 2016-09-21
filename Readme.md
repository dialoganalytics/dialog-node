# Dialog Node

A node.js client for the [Dialog](https://dialoganalytics.com) API.

[![Dependency Status](https://gemnasium.com/badges/github.com/dialoganalytics/dialog-node.svg)](https://gemnasium.com/github.com/dialoganalytics/dialog-node)


## Documentation

See the [API docs](https://docs.dialoganalytics.com).

## Installation

Install using [npm](https://www.npmjs.com/).

```bash
npm install dialog-api@1.x --save
```

## Usage

Create a framework specific API client:

```js
// Framework specific
var Dialog = require('dialog-api/lib/botkit/messenger');
var Dialog = require('dialog-api/lib/botkit/twilioipm');
var Dialog = require('dialog-api/lib/messenger'); // coming soon
var Dialog = require('dialog-api/lib/kik');

// Generic
var Dialog = require('dialog-api');

var dialog = new Dialog('DIALOG_API_TOKEN', 'botId');
```

### Tracking messages

#### Generic

See [docs.dialoganalytics.com/reference/track](https://docs.dialoganalytics.com/reference/track/)

```js
var payload = {};

dialog.track(payload)
```

#### Messenger with Botkit

Example [Messenger bot built with Botkit](https://github.com/dialoganalytics/dialog-node/blob/master/examples/botkit-messenger.js)

```js
controller.middleware.receive.use(dialog.incomingMiddleware);
controller.middleware.send.use(dialog.outgoingMiddleware);
```

#### Twilio IP Messaging with Botkit

Example [Twilio IP messaging bot built with Botkit](https://github.com/dialoganalytics/dialog-node/blob/master/examples/botkit-twilioipm.js)

```js
controller.middleware.receive.use(dialog.incomingMiddleware);
controller.middleware.send.use(dialog.outgoingMiddleware);
```

#### Messenger

Coming soon

#### Kik with @kikinteractive/kik

Example [Kik bot built with @kikinteractive/kik](https://github.com/dialoganalytics/dialog-node/blob/master/examples/kik.js)

```js
// ...
bot.onTextMessage((message) => {
  dialog.incoming(message);
  // ...
});

// ...

response.then(function() {
  replies.forEach((text) => {
    payload = {
      type: 'text',
      body: text,
      chatId: message.chatId
    };

    dialog.outgoing(payload);
  });
});

// ...
```

### Tracking clicks

Track links (or anything with a URL) clicked by users inside a conversation.

```js
var link = {
  "type": "web_url",
  "url": dialog.link('http://example.com'), // https://api.dialoganalytics.com/v1/click/botId?url=http://example.com
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
