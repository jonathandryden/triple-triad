const app = require("express")(),
config = require("./config.js");
http = require("http").Server(app),
io = require("socket.io")(http),
server = require("./server.js")(io);

const Logger = require("./Logger.js"),
User = require("./User.js");

app.get("/", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});
http.listen(config.server.port, function(){
  console.log("listening on *:" + config.server.port);
});
