#!/usr/bin/env node
const core = require('@actions/core');
const amqp = require('amqplib/callback_api');
console.log("amqp created.");
try {
  const RABBITMQ_HOST = core.getInput("RABBITMQ_HOST");
  const RABBITMQ_VHOSTNAME = core.getInput("RABBITMQ_VHOSTNAME");
  const RABBITMQ_USERNAME = core.getInput("RABBITMQ_USERNAME");
  const RABBITMQ_PASSWORD = core.getInput("RABBITMQ_PASSWORD");

  const MESSAGE = core.getInput("MESSAGE");
  const HEADERS = core.getInput("HEADERS");
  const QUEUENAME = core.getInput("QUEUENAME");

  const headerSeperator = ';';
  const keyValueSeperator = ':';
  var url = 'amqp://' + RABBITMQ_USERNAME + ':' + RABBITMQ_PASSWORD + '@' + RABBITMQ_HOST + '/' + RABBITMQ_VHOSTNAME;
  console.log("Url: " + url);
  amqp.connect(url, function (error0, connection) {
    if (error0) {
      console.log("error0: " + error0);
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      console.log("creating channel");
      if (error1) {
        console.log("error1: " + error1);
        throw error1;
      }

      var headers = HEADERS.split(headerSeperator);
      console.log(headers);

      // construct the headers object
      var headerVals = {};
      for (i = 0; i < headers.length; i++) {
        var vals = headers[i].split(keyValueSeperator);
        headerVals[vals[0]] = vals[1];
      }

      console.log(headerVals);
      channel.assertQueue(QUEUENAME, {
        durable: true,
        exclusive: false,
        autoDelete: false,
        arguments: null
      });
      console.log("asserting channel");

      let opts = { headers: headerVals };
      channel.publish('', QUEUENAME, Buffer.from(MESSAGE), opts);
      console.log("message sent");

      console.log(" [x] Sent %s", MESSAGE);
    });
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  });
} catch (error) {
  core.setFailed(error.message);
}