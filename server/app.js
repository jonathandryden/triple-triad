const app = require("express")(),
http = require("http").Server(app),
io = require("socket.io")(http),
server = require("./server.js")(io);

const Logger = require("./Logger.js"),
User = require("./User.js");

app.get("/", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});
http.listen(3000, function(){
  console.log("listening on *:3000");
});
