'use strict';

exports.assertion = function(msg) {
  this.expected = 0;
  this.message = msg || 'No console errors';
  this.ignoredErrorMessagePatterns = [
    'chrome-extension',
    'plugins/elementor/assets/js', // elementor errors
    'ytimg', // youtube images
    'youtube.com', // youtube embed errors generally
    'favicon.ico', // ignore missing favicons
    'sndcdn.com', // SoundCloud embed JS errors
  ];

  this.pass = (errors) => {
    const parsed = JSON.parse(errors);
    return parsed.length === this.expected;
  };

  this.value = (result) => {
    return result;
  };

  this.command = (callback) => {
    return this.api.getAllLog('browser', logs => {
      const ignoresRe = new RegExp(this.ignoredErrorMessagePatterns.join('|'), 'g');
      const errors = logs
        .filter(log => log.level === 'SEVERE')
        .filter(error => !error.message.match(ignoresRe));
      callback(JSON.stringify(errors))
    });
  };
};