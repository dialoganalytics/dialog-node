'use strict';

var Client = require("../client");

var incomingHandler = require("./incoming");
var outgoingHandler = require("./outgoing");

module.exports = function(apiToken, botId) {
  var that = this;

  this.client = new Client(apiToken, botId);

  this.incoming = function(payload, callback) {
    incomingHandler(that.client, payload, callback)
  };

  this.outgoing = function(payload, response, callback) {
    outgoingHandler(that.client, payload, response, callback)
  };

  return this;
};

// Valid event types
// INITIALIZE
// INSTALL
// SESSION_START
// SPEECH
// SESSION_END

/**
* Fires the track event and executes the callback
* function with the speech output SSML + response
* @param  {String}   intentName            The intent string
* @param  {Object}   intentMetadata        Object containing intent metadata like slots
* @param  {String}   speechText            String speech out by Alexa
* @param  {Function} cb                    Callback function for success
* @return {Void}
*/
track: function(intentName, intentMetadata, speechText, cb){
  var error = false;

  //Error check to make sure we have everything we need
  if(!config.app_token || !config.app_token.length || !_.isString(config.app_token)){
    console.error(errors.noTokenError);
    error = true;
  }

  if(!config.session_id){
    console.error(errors.invalidSessionId);
    error = true;
  }

  if(!config.user_hashed_id){
    console.error(errors.invalidUserError);
    error = true;
  }

  if(!intentName) {
    console.error(errors.invalidIntentNameError);
    error = true;
  }

  if(error){
    if(_.isFunction(cb)){
      cb({
        error: 'Invalid arguments passed to track(). See standard error for details.'
      });
    }

    return;
  }

  var payload = {
    app_token: config.app_token,
    user_hashed_id: config.user_hashed_id,
    session_id: config.session_id,
    intent: intentName,
    data: {
      metadata: intentMetadata,
      speech: speechText,
    },
  };

  // check if session exists
  if(!initialized){
    initialized = true;
    config.agent = 'alexa';

    // trigger session event
    trigger(Enums.eventTypes.INITIALIZE, config, function(){
      // trigger speech event
      trigger(Enums.eventTypes.SPEECH, payload, cb);
    });
  }else{
    // trigger speech event
    trigger(Enums.eventTypes.SPEECH, payload, cb);
  }
}
