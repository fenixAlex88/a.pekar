(function () {
    const canvas = document.getElementById('app');
    const ctx = canvas.getContext('2d');
    const ball = {
        x: 200,
        y: 200,
        size: 15,
        speedX: 0.5,
        speedY: 2.5
    };
    const arena = {
        width: 500,
        height: 800
    };
    const ballMove = () => {
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.x >= arena.width - ball.size || ball.x <= ball.size) ball.speedX *= (-1);
        if ((ball.y === arena.height - ball.size - 5
                && ball.x >= players.selfPos - 50
                && ball.x <= players.selfPos + 50)
            || (ball.y === ball.size + 5
                && ball.x >= players.enemyPos - 50
                && ball.x <= players.enemyPos + 50)) {
            ball.speedY *= (-1)
        }
        if (ball.y<=0||ball.y>=arena.height){
            clearInterval(game);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    const players = {
        selfName: localStorage.name,
        selfPos: 250,
        enemyPos: 250
    }
    const socket = io.connect();

    const renderGame = () => {
        canvas.style.cursor = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#eeec7e';
        ctx.fillRect(0, 0, arena.width, arena.height)
        ctx.fill();
        ctx.fillStyle = "rgb(238,33,56)";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#191497';
        ctx.beginPath();
        ctx.fillRect(players.selfPos, 795, 100, 5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#6ca839';
        ctx.beginPath();
        ctx.fillRect(players.enemyPos, 0, 100, 5);
        ctx.closePath();
        ctx.fill();
   //     ballMove();
    }

    canvas.addEventListener('mousemove', (e) => {
        socket.emit('send move', {name: socket.id, pos: e.clientX - 100 > 0 ? e.clientX - 100 : 0});
    });

    socket.on('add move', (data) => {
        if (data.flag === socket.id) {
            players.selfPos = data.pos
        } else {
            players.enemyPos = data.pos
        }

    });

    socket.on('send render', (data) =>{
        ball.x=data.x;
        ball.y=data.y;
    })

    const game = setInterval(renderGame, 10);

})();
