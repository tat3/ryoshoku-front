const chromedriver = require('chromedriver');

module.exports = {
  test_settings: {
    default: {
      desiredCapabilities : {
        browserName : 'chrome',
        chromeOptions : {
          w3c: false,
          args: [
            '--no-sandbox',
            '--ignore-certificate-errors',
            '--allow-insecure-localhost',
            '--headless'
          ]
        }
      },
      webdriver: {
        start_process: true,
        port: 9515,
        server_path: chromedriver.path
      }
    },
  },

  custom_assertions_path: './nightwatch/assertions',
  custom_commands_path: './nightwatch/commands'
};