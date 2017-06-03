"use strict";

const chai = require("chai");
const assert = chai.assert;
const io = require('socket.io-client');
const socketURL = "http://localhost:3000";

describe("Socket-Server", function () {
  it('user connected .', function (done) {
    var client = io.connect(socketURL);
    client.on('connect', function () {
      console.log("connected");
      client.on("sesh", function(data) {
        console.dir(data);
        client.emit("client", client.id);
        done();
      });
    });
  });
});
