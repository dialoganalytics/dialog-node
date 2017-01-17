'use strict';

// Converts a Facebook locale into ISO 639-1 format
// @param {String} Facebook locale formated like 'en_US'
// @returns {String} ISO 639-1 locale. Example: 'en'
// @see https://developers.facebook.com/docs/internationalization
function locale(locale) {
  return locale.split('_')[0];
};

module.exports = locale;
