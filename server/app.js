const express = require("express");
const app = express(),
config = require("./config.js");
http = require("http").Server(app),
io = require("socket.io")(http),
server = require("./server.js")(io),
path = require("path");

const Logger = require("./Logger.js"),
User = require("./User.js");

app.use(express.static(path.join(__dirname, "public")));

http.listen(config.server.port, function(){
  console.log("listening on *:" + config.server.port);
});
