module.exports = {
  // Converts a Facebook locale into ISO 639-1 format
  // @param {string} Facebook locale formated like 'en_US'
  // @see https://developers.facebook.com/docs/internationalization
  messenger: function(locale) {
    return locale.split('_')[0];
  }
}
