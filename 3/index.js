const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

app.get ('/', function(request, respons){
    respons.sendFile(__dirname + '/index.html');
});