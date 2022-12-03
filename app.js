var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/./index.html");
});

var clients = 0;

//** Whenever someone connects this gets executed */
io.on("connection", function (socket) {
  //   console.log("A user connected");

  //** message event */
  // setTimeout(function(){
  //     socket.send('Sent a message 4seconds after connection!');
  //  }, 4000);

  //** Custom event */
  //   setTimeout(function () {
  //     // Sending an object when emmiting an event
  //     socket.emit("testerEvent", {
  //       description: "A custom event named testerEvent!",
  //     });
  //   }, 4000);

  //** Receive event from the client */
  //   socket.on("clientEvent", function (data) {
  //     console.log(data);
  //   });

  //** Broadcast to all connected users with itself */
  //   clients++;
  //   io.sockets.emit("broadcast", {
  //     description: clients + " clients connected!",
  //   });

  //** Broadcast to all connected users without itself */
  clients++;
  socket.emit("newclientconnect", { description: "Hey, welcome!" });
  socket.broadcast.emit("newclientconnect", {
    description: clients + " clients connected!",
  });

  //** Whenever someone disconnects this piece of code executed */
  socket.on("disconnect", function () {
    // console.log("A user disconnected");

    //** Broadcast to all connected users with itself */
    // clients--;
    // io.sockets.emit("broadcast", {
    //   description: clients + " clients connected!",
    // });

    //** Broadcast to all connected users without itself */
    clients--;
    socket.broadcast.emit("newclientconnect", {
      description: clients + " clients connected!",
    });
  });
});

http.listen(5000, () => {
  console.log("Server is listening in port 5000");
});
