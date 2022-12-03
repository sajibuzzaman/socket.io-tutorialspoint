var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/./index.html");
});
app.get("/my-namespace2", function (req, res) {
  res.sendFile(__dirname + "/./index2.html");
});

var clients = 0;
var roomno = 1;

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

  //   //** Broadcast to all connected users without itself */
  //   clients++;
  //   socket.emit("newclientconnect", { description: "Hey, welcome!" });
  //   socket.broadcast.emit("newclientconnect", {
  //     description: clients + " clients connected!",
  //   });

  //** Joining rooms */
  socket.join("room-" + roomno);
  //Send this event to everyone in the room.
  io.sockets
    .in("room-" + roomno)
    .emit("connectToRoom", "You are in room no. " + roomno);


  //** Whenever someone disconnects this piece of code executed */
  socket.on("disconnect", function () {
    // console.log("A user disconnected");
    //** Broadcast to all connected users with itself */
    // clients--;
    // io.sockets.emit("broadcast", {
    //   description: clients + " clients connected!",
    // });
    //** Broadcast to all connected users without itself */
    // clients--;
    // socket.broadcast.emit("newclientconnect", {
    //   description: clients + " clients connected!",
    // });
  });
});

// //** Custom namespace */
// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//    console.log('someone connected in nsp');
//    nsp.emit('hi', 'Hello nsp!');
// });

// var nsp2 = io.of('/my-namespace2');
// nsp2.on('connection', function(socket){
//    console.log('someone connected nsp2');
//    nsp2.emit('hi', 'Hello nsp2!');
// });

http.listen(5000, () => {
  console.log("Server is listening in port 5000");
});
