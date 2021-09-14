const http= require("http");
const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser =require("body-parser");
app.set("view engine" , "ejs");


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/" , function(req , res ){
  res.render("index");
})

const server = app.listen(3000 , function(req , res ){
  console.log("sever at 3000");
})

//  include socket.io

const io = require("socket.io")(server);

io.on("connection", (socket)=> {
console.log(" a new client");

socket.username= "shubham";
socket.on("new_message", (data)=>{
  io.sockets.emit("new_message",{
    message:data.message,
    username:socket.username
  });

  socket.on("change_username", (data) =>{
    socket.username=data.username;
  });

socket.on("typing" , data =>
{
  socket.broadcast.emit("typing", {username:socket.username});
})

});


});
