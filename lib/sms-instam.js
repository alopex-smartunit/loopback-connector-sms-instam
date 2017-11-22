"use strict";

const assert = require('assert');
const axios = require('axios');
const jsontoxml = require('jsontoxml');

let smsInstamClient, url, username, password;

/**
 * Export the SMSInstamConnector class.
 */
module.exports = SMSInstamConnector;

/**
 * Create an instance of the connector with the given `settings`.
 */
function SMSInstamConnector(settings) {
  assert(
    typeof settings === "object",
    "cannot initialize SMSInstamConnector without a settings object"
  );

  url = this.url = settings.url;
  username = this.username = settings.username;
  password = this.password = settings.password;
}

SMSInstamConnector.initialize = function(dataSource, callback) {
  dataSource.connector = new SMSInstamConnector(dataSource.settings);
  callback();
};

SMSInstamConnector.prototype.DataAccessObject = SMSInstam;

function SMSInstam() {}

/**
 * Send a SMSInstam message with the given `options`.
 */
SMSInstam.send = ({ to, message }, cb) => {
  const data = jsontoxml({
    name: 'package',
    attrs: {
      login: username,
      password: password
    },
    children: [{
      name: 'message',
      children: [{
        name: 'msg',
        attrs: {
          recipient: to
        },
        text: message
      }]
    }]    
  }, true);

  axios
    .post(url, data)
    .then(
      result => {
        cb(null, result);
      },
      err => cb(err)
    );
};

/**
 * Initialize the connector for the given data source
 * @param {DataSource} dataSource The data source instance
 * @param {Function} [callback] The callback function
 */
exports.initialize = function initializeDataSource(dataSource, callback) {
  console.log("Happy coding :)");
};

/**
 * Send using `modelInstance.send()`.
 */
SMSInstam.prototype.send = function({ to, message }, cb) {
  this.constructor.send({ to, message }, cb, this);
};

/**
 * Access the twilio client object.
 */
// SMSInstamConnector.client;
// SMSInstamConnector.prototype.client = SMSInstam.client = SMSInstam.prototype.client = smsInstamClient;
