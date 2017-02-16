# Dialog Node

A node.js client for the [Dialog](https://dialoganalytics.com) API.

[![Dependency Status](https://gemnasium.com/badges/github.com/dialoganalytics/dialog-node.svg)](https://gemnasium.com/github.com/dialoganalytics/dialog-node)
[![NPM Version](http://img.shields.io/npm/v/dialog-api.svg)](https://www.npmjs.org/package/dialog-api)

## Examples

- Amazon Alexa (soon)
- Google Actions (soon)
- Twilio SMS (soon)
- [Botpress](https://github.com/dialoganalytics/botpress-example)
- [Twilio Programmable Chat with Botkit](https://github.com/dialoganalytics/botkit-twilio-ipm-example)
- [Facebook Messenger with Botkit](https://github.com/dialoganalytics/botkit-messenger-example)
- [Facebook Messenger with Express](https://github.com/dialoganalytics/messenger-node-example)
- [Kik](https://github.com/dialoganalytics/kik-node-example)

## Installation

Install using [npm](https://www.npmjs.com/package/dialog-api).

```bash
npm install dialog-api --save
```

## Usage

This library needs to be configured with your API token which is available in your [personal account](http://app.dialoganalytics.com/users/edit), and a bot ID.

```js
var Dialog = require('dialog-api');
var dialog = new Dialog(request.env('DIALOG_API_TOKEN'), request.env('DIALOG_BOT_ID'));
```

### Tracking messages

#### Generic

See [docs.dialoganalytics.com/reference/track](https://docs.dialoganalytics.com/reference/track/)

```js
var payload = {
  message: {
    platform: "messenger",
    provider: "dialog-node",
    mtype: "text",
    sent_at: 1484948110.458,
    nlp: {
      intents: [
        {
          name: 'order.create',
          confidence: 0.98
        }
      ]
    },
    properties: {
      text: "Hello world"
    }
  },
  conversation: {
    distinct_id: "0a4b6c44-55e0-4381-a678-34f02b2620d7"
  },
  creator: {
    distinct_id: "d5ae3f5f-1645-40c3-a38a-02382cd0ee49",
    type: "interlocutor",
    username: "@elon",
    first_name: "Elon",
    last_name: "Musk",
    email: "elon@spacex.com",
    gender: "male",
    locale: "US",
    phone: "1234567890",
    profile_picture: "http://spacex.com/elon.jpg",
    timezone: -5
  }
};

dialog.track(payload);
```

#### Botpress

Example: [Botpress bot with botpress-dialog](https://github.com/dialoganalytics/botpress-example)

See [botpress-dialog](https://github.com/dialoganalytics/botpress-dialog)

#### Twilio Programmable Chat (IP Messaging) with Botkit

Example: [Twilio Programmable Chat bot built with Botkit](https://github.com/dialoganalytics/botkit-twilio-ipm-example)

```js
var Dialog = require('dialog-api/lib/botkit/twilioipm');

controller.middleware.receive.use(dialog.incomingMiddleware);
controller.middleware.send.use(dialog.outgoingMiddleware);
```
#### Messenger with Botkit

Example: [Messenger bot built with Botkit](https://github.com/dialoganalytics/botkit-messenger-example)

```js
var Dialog = require('dialog-api/lib/botkit/messenger');

controller.middleware.receive.use(dialog.incomingMiddleware);
controller.middleware.send.use(dialog.outgoingMiddleware);
```

#### Facebook Messenger with expressjs/express

Example: [Messenger bot built with expressjs/express](https://github.com/dialoganalytics/messenger-node-example)

```js
var Dialog = require('dialog-api/lib/messenger');

var app = express();

// ...
app.post('/webhook', function(req, res) {
  dialog.incoming(req.body);

  var messagingEvents = req.body.entry[0].messaging;

  if (messagingEvents.length && messagingEvents[0].message) {
    var event = req.body.entry[0].messaging[0];

    var payload = {
      recipient: {
        id: event.sender.id
      },
      message: { text: 'Hey human!' }
    };

    var options = {
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: payload
    };

    request(options, function(error, response, body) {
      dialog.outgoing(payload, body);
    });
  }
})
```

#### Kik with @kikinteractive/kik

Example: [Kik bot built with @kikinteractive/kik](https://github.com/dialoganalytics/kik-node-example)

```js
var Dialog = require('dialog-api/lib/kik');

// ...
bot.use(function(message, next) {
  dialog.incomingMiddleware(message, next);
});

bot.outgoing(function(message, next) {
  dialog.outgoingMiddleware(message, next);
});
```

### Events

Send events to Dialog to keep track of your custom logic. Optionally pass an `interlocutorId` to tie the event to one of your bot's interlocutors.  See [docs.dialoganalytics.com/reference/event#create](https://docs.dialoganalytics.com/reference/event#create)

```js
dialog.event('subscribed', new Date().getTime() / 1000, 'interlocutorId', { custom: 'value' })
```

### Tracking clicks

Track links clicked by interlocutors inside a conversation. Pass the interlocutor's distinct Id (provided by the platform or provider) and the `url`. See [docs.dialoganalytics.com/reference/click-tracking](https://docs.dialoganalytics.com/reference/click-tracking/)

```js
dialog.link('http://example.com', user.id)
// https://api.dialoganalytics.com/v1/b/7928374/clicks/?id=123456&url=http%3A%2F%2Fexample.com
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

Update an interlocutor. See [docs.dialoganalytics.com/reference/interlocutor#update](https://docs.dialoganalytics.com/reference/interlocutor#update)
#### Creating an interlocutor

```js
dialog.updateInterlocutor(distinctId, params);
```
To create an interlocutor, use the `track` endpoint. An interlocutor must initially be created in association with a conversation. See [docs.dialoganalytics.com/reference/track](https://docs.dialoganalytics.com/reference/track/)

## Documentation

See the [API docs](https://docs.dialoganalytics.com).
