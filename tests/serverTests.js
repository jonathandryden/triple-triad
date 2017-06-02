"use strict";

const chai = require("chai");
const assert = chai.assert;
var io = require('socket.io-client');
var socketURL = "http://localhost:3000";

describe("Socket-Server", function () {
  it('user connected .', function (done) {
    var client = io.connect(socketURL);
    client.on('connect', function (data) {
      done();
    });
  });
});
