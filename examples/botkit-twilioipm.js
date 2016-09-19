// This is an example integration of dialog-node with howdyai/botkit (https://github.com/howdyai/botkit)
//
// Get started:
//   1. Create an account on https://app.dialoganalytics.com
//   2. Find your API token in your personal settings page and your Bot ID in the bot's settings page
//   3. Clone this repository and run `npm install`
//   4. Follow these instructions to get started with a Twilio IPM bot https://github.com/howdyai/botkit/blob/master/readme-twilioipm.md
//   5. Run this example by typing `node examples/botkit-twilioipm.js https://somesubdomain.ngrok.io' from the repository root
//   6. Open a Twilio IPM application, such as https://github.com/twilio/ip-messaging-demo-js and exchange a few messages. Messages will be sent to Dialog's API.
//   7. Read more on how to make the most out of the possibilities offered by Dialog here: https://docs.dialoganalytics.com

var Botkit = require('botkit');

var Dialog = require('../lib/botkit/twilioipm'); // Replace this by `require('dialog-api/lib/botkit/twilioipm')` in your own project
var track = new Dialog(process.env.DIALOG_API_TOKEN, process.env.DIALOG_BOT_ID);

var controller = Botkit.twilioipmbot();

// Track incoming and outgoing messages
controller.middleware.receive.use(track.incomingMiddleware);
controller.middleware.send.use(track.outgoingMiddleware);

var bot = controller.spawn({
  TWILIO_IPM_SERVICE_SID: process.env.TWILIO_IPM_SERVICE_SID,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY: process.env.TWILIO_API_KEY,
  TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
  identity: 'Botkit',
  autojoin: true
});


controller.setupWebserver(3000, function(err, webserver) {
  controller.createWebhookEndpoints(controller.webserver, bot, function() {
    console.log('This bot is online!!!');
  });
});

// user said hello
controller.hears(['hello'], 'message_received', function(bot, message) {
  bot.reply(message, 'Hey there.');
});

controller.hears(['cookies'], 'message_received', function(bot, message) {

  bot.startConversation(message, function(err, convo) {

    convo.say('Did someone say cookies!?!!');
    convo.ask('What is your favorite type of cookie?', function(response, convo) {
      convo.say('Golly, I love ' + response.text + ' too!!!');
      convo.next();
    });
  });
});
