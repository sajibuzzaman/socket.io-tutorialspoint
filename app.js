var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/./index.html");
});

//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");

  // // message event
  // setTimeout(function(){
  //     socket.send('Sent a message 4seconds after connection!');
  //  }, 4000);

  // Custom event
  setTimeout(function () {
    // Sending an object when emmiting an event
    socket.emit("testerEvent", {
      description: "A custom event named testerEvent!",
    });
  }, 4000);

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

http.listen(5000, () => {
  console.log("Server is listening in port 5000");
});
