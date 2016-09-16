# Dialog Node

A node.js client for the [Dialog](https://dialoganalytics.com) API.

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
var Dialog = require('./dialog/botkit');
var Dialog = require('./dialog/messenger');
var Dialog = require('./dialog/kik');

var track = new Dialog('DIALOG_API_TOKEN', 'botId')
```

Or keep it real:

```js
var Dialog = require('./dialog');

var payload = {}; // See https://docs.dialoganalytics.com/reference/track/

Dialog.track('DIALOG_API_TOKEN', 'botId', payload);
```
