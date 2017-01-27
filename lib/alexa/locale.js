'use strict';

// Converts a Amazon locale into ISO 639-1 format
// @param {String} Amazon locale formated like 'en-US'
// @returns {String} ISO 639-1 locale. Example: 'en'
function locale(locale) {
  return locale.split('-')[0];
};

module.exports = locale;
