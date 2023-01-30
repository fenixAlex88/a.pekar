const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(10000);
app.use('/', express.static(__dirname + '/client/'));

app.get('/', function (request, respons) {
    respons.sendFile(__dirname + '/client/index.html');
});

const players = {};
const connections = [];

io.on("connection", (socket) => {
    console.log('Успешное соединение');
    connections.push(socket);
    io.emit('set players', {name: socket.id, num: connections.length});


    socket.on('disconnect', (data) => {
        console.log('Отключение');
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('send move', (data) => {
        players[data.name] = data.pos;
        io.emit('add move', {name: data.name, pos: data.pos});
        console.log(players);
    });
});

let isGame = true;
const ball = {
    x: 250,
    y: 400,
    size: 10,
    speedX: 1,
    speedY: 5,
};

const arena = {
    width: 500,
    height: 800
};

const ballMove = () => {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x >= arena.width - ball.size || ball.x <= ball.size) ball.speedX *= (-1);
    if (ball.y === arena.height - ball.size - 5
        && (ball.x >= players['2'] - 10 && ball.x <= players['2'] + 110) || ball.y === 0) {
        ball.speedY *= (-1)
    }
    if (ball.y <= 0 || ball.y >= arena.height) {
        ball.x = 250;
        ball.y = 400;
    }
};

const sendRender = () => {
    ballMove();
    io.emit('send render', {x: ball.x, y: ball.y})
}

setInterval(sendRender, 10);