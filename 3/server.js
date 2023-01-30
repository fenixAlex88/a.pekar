const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);
app.use('/', express.static(__dirname + '/client/'));

app.get('/', function (request, respons) {
    respons.sendFile(__dirname + '/client/index.html');
});

const users = [];
const connections = [];

io.on("connection", (socket) => {
    console.log('Успешное соединение');
    console.log(socket.id);
    connections.push(socket);

    socket.on('disconnect', (data) => {
        console.log('Отключение');
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('send mess', (data) => {
        io.emit('add mess', {mess: data.msg, name: data.name});
    });
});

