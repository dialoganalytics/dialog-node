// This is an example integration of dialog-node with @kikinteractive/kik (https://github.com/kikinteractive/kik-node)
//
// Get started:
//   1. Create an account on https://app.dialoganalytics.com
//   2. Find your API token in your personal settings page and your Bot ID in the bot's settings page
//   3. Clone this repository
//   4. Replace hardcoded API tokens, username and bot ID values
//   5. When developping locally use a service like ngrok.com to expose a server running on your machine. For example: `ngrok http 8080`
//   6. Run this example by typing `node examples/kik.js' from the repository root
//   7. Open the Kik application, find your bot and exchange a few messages. Messages will be sent to Dialog's API.
//   8. Read more on how to make the most out of the possibilities offered by Dialog here: https://docs.dialoganalytics.com

var util = require('util');
var http = require('http');
var Bot  = require('@kikinteractive/kik');

var Dialog = require('dialog-api/lib/kik');
var track = new Dialog('DIALOG_API_TOKEN', 'yourBotId')

// Configure the bot
var bot = new Bot({
  username: 'YOUR_BOT_USERNAME',
  apiKey: 'KIK_API_TOKEN',
  baseUrl: 'https://example.com'
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
  track.incoming(message); // Track an incoming message

  var replies = ["Hey, ho!", "Let's go!"];
  var response = bot.send(replies, message.from, message.chatId);

  response.then(function() {
    replies.forEach((text) => {
      payload = {
        type: 'text',
        body: text,
        chatId: message.chatId
      };

      track.outgoing(payload); // Track outgoing message(s)
    });
  });
});

// Set up your server and start listening
let server = http
  .createServer(bot.incoming())
  .listen(process.env.PORT || 8080);
