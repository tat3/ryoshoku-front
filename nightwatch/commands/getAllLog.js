const ClientCommand = require('nightwatch/lib/api/client-commands/_base-command');

let logs = []

class GetAllLog extends ClientCommand {

  performAction(actionCallback) {
    this.api.getLog(this.typeString, newLogs => {
      logs = logs.concat(newLogs)

      actionCallback.call(this, logs)
    })
  }

  command(typeString = 'browser', callback) {
    if (arguments.length === 1 && typeof arguments[0] == 'function') {
      callback = arguments[0];
      typeString = 'browser';
    }

    this.typeString = typeString;

    return super.command(callback)
  }
}

module.exports = GetAllLog;