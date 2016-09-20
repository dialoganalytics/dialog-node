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
// Require the right version for your framework
var Dialog = require('dialog-api/lib/botkit/messenger');
var Dialog = require('dialog-api/lib/botkit/twilioipm');
var Dialog = require('dialog-api/lib/messenger'); // coming soon
var Dialog = require('dialog-api/lib/kik');

var dialog = new Dialog('DIALOG_API_TOKEN', 'botId')
```

Or keep it real:

```js
var Dialog = require('dialog-api');

var payload = {}; // See https://docs.dialoganalytics.com/reference/track/

Dialog.track('DIALOG_API_TOKEN', 'botId', payload);
```

### Tracking messages

#### Messenger with Botkit

[Example Messenger bot built with Botkit](https://github.com/dialoganalytics/dialog-node/blob/master/examples/botkit-messenger.js)

```js
controller.middleware.receive.use(dialog.incomingMiddleware);
controller.middleware.send.use(dialog.outgoingMiddleware);
```

#### Twilio IP Messaging with Botkit

[Example Twilio IP messaging bot built with Botkit](https://github.com/dialoganalytics/dialog-node/blob/master/examples/botkit-twilioipm.js)

```js
controller.middleware.receive.use(dialog.incomingMiddleware);
controller.middleware.send.use(dialog.outgoingMiddleware);
```

#### Messenger

Coming soon

#### Kik

[Example Kik bot](https://github.com/dialoganalytics/dialog-node/blob/master/examples/kik.js)

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
