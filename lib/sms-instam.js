"use strict";

const assert = require('assert');
const axios = require('axios');
const json2xml = require('json2xml');

/**
 * Export the SMSInstamConnector class.
 */
module.exports = SMSInstamConnector;

function SMSInstam() {}

/**
 * Create an instance of the connector with the given `settings`.
 */
function SMSInstamConnector(settings) {
  assert(
    typeof settings === "object",
    "cannot initialize SMSInstamConnector without a settings object"
  );

  SMSInstam.url = settings.url;
  SMSInstam.username = settings.username;
  SMSInstam.password = settings.password;
}

SMSInstamConnector.initialize = function(dataSource, callback) {
  dataSource.connector = new SMSInstamConnector(dataSource.settings);
  callback();
};

SMSInstamConnector.prototype.DataAccessObject = SMSInstam;

/**
 * Send a SMSInstam message with the given `options`.
 */
SMSInstam.send = ({ to, message }, cb) => {
  const data = json2xml({
    package: {
      message: {
        msg: message,
        attr: {
          sender: SMSInstam.username,
          recipient: to
        }
      }
    },
    attr: {
      login: SMSInstam.username,
      password: SMSInstam.password
    }
  }, { header: true, attributes_key: 'attr' });

  axios
    .post(SMSInstam.url, data, { headers: { 'Content-Type': 'text/xml' }})
    .then(
      result => {
        cb(null, result);
      },
      err => {
        cb(err);
      }
    );
};

/**
 * Initialize the connector for the given data source
 * @param {DataSource} dataSource The data source instance
 * @param {Function} [callback] The callback function
 */
exports.initialize = function initializeDataSource(dataSource, callback) {};

/**
 * Send using `modelInstance.send()`.
 */
SMSInstam.prototype.send = function({ to, message }, cb) {
  this.constructor.send({ to, message }, cb, this);
};
