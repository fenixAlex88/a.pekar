(function () {
    const canvas = document.getElementById('app');
    const scoreInfo = document.getElementById('score');
    const resultInfo = document.getElementById('result');
    const againBtn = document.getElementById('againBtn');

    const ctx = canvas.getContext('2d');
    const battlefield = new Image();
    battlefield.src = 'grass.jpg';
    const arena = {
        width: 500,
        height: 800
    };
    const ball = {
        x: arena.width / 2,
        y: arena.height / 2,
        size: 15,
        speedX: 1,
        speedY: 4
    };

    const players = localStorage.gameInfo ?
        JSON.parse(localStorage.gameInfo)
        : {
            selfPos: arena.width / 2 -100,
            selfScore: 0,
            enemyPos: arena.width / 2 -100,
            enemyScore: 0
        };
    const clear = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, arena.width, arena.height)
        ctx.fill();
    }
    clear();
    const ballMove = () => {
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.x >= arena.width - ball.size || ball.x <= ball.size) ball.speedX *= (-1);
        if (ball.y === arena.height - ball.size - 5
            && ball.x >= players.selfPos - 5
            && ball.x <= players.selfPos + 105) {
            score++;
            ball.speedY *= (-1);
            ball.speedX += (ball.x - players.selfPos - 50) / 20;
        }

        if (ball.y === ball.size + 5
            && ball.x >= players.enemyPos
            && ball.x <= players.enemyPos + 100) {
            ball.speedY *= (-1);
        }
        if (ball.y <= 0 || ball.y >= arena.height) {
            isGame = false;
            clear();
            if (ball.y <= 0) {
                players.selfScore++;
                resultInfo.textContent = `You WON!!!`;
            } else {
                players.enemyScore++;
                resultInfo.textContent = `You LOSE!!!`;
            }
            localStorage.gameInfo = JSON.stringify(players);
            againBtn.style.display = 'block';
            canvas.style.cursor = 'auto';
        }

        const offset = 2.0 + Math.random();
        if (players.enemyPos > ball.x - 50)
            players.enemyPos -= offset;
        if (players.enemyPos < ball.x - 50)
            players.enemyPos += offset;
        if (players.enemyPos < 0) players.enemyPos = 0;
        if (players.enemyPos > arena.width - 100) players.enemyPos = arena.width - 100;
    };
    let isGame = true;
    let game;
    const renderGame = () => {
        canvas.style.cursor = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(battlefield, 0, 0);
        ctx.fillStyle = "#e2ff42";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#191497';
        ctx.beginPath();
        ctx.roundRect(players.selfPos, 790, 100, 10, 5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#990000';
        ctx.beginPath();
        ctx.roundRect(players.enemyPos, 0, 100, 10, 5);
        ctx.closePath();
        ctx.fill();
        ballMove();
        scoreInfo.textContent = `SCORE: ${players.selfScore} : ${players.enemyScore}`;
        if (isGame) requestAnimationFrame(renderGame);
    };
    /*   canvas.addEventListener('mousemove', (e) => {
           players.selfPos = e.offsetX - 100 > 0 ? e.offsetX - 100 : 0;
       });
   */
    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 37) {
            players.selfPos = players.selfPos > 0 ? players.selfPos - 9 : players.selfPos;
        }

        if (e.keyCode === 39) {
            players.selfPos = players.selfPos < arena.width - 100 ? players.selfPos + 9 : players.selfPos;
        }

    })

    window.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const x = e.touches[0].screenX;
        console.log(window.screen.width);
        console.log(e.touches[0]);
        if (x > (window.screen.width / 2)) {
            players.selfPos += 20;
        } else {
            players.selfPos -= 20;
        }
    });

    againBtn.addEventListener('click', () => {
        ball.x = arena.width / 2;
        ball.y = arena.height / 2;
        ball.speedX = 0;
        againBtn.style.display = 'none';
        canvas.style.cursor = 'none';
        resultInfo.textContent = '';
        isGame = true;
        renderGame();
    })


})();
