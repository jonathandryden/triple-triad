const app = require("express")(),
http = require("http").Server(app),
io = require("socket.io")(http);

const Logger = require("./Logger.js"),
User = require("./User.js");

app.get("/", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function(socket){
  console.log("User connected.");

  let user = new User(socket.id);

  io.emit("sesh", socket.id);
  socket.on("disconnect", function(){
    console.log("user disconnected");
  });
  socket.on("client", function(d) {
    console.dir(d);
  });
});


http.listen(3000, function(){
  console.log("listening on *:3000");
});
