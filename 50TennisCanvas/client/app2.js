(function () {
    const canvas = document.getElementById('app');
    const scoreInfo = document.getElementById('score');
    const resultInfo = document.getElementById('result');
    const againBtn = document.getElementById('againBtn');

    const ctx = canvas.getContext('2d');
    const battlefield = new Image();
battlefield.src = 'grass.jpg';
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
    const players = {
        selfName: localStorage.name,
        selfPos: 250,
        enemyPos: 250
    }
    let result = '';
    let score = 0;
    let bestScore = localStorage.bestScore ? localStorage.bestScore : 0;
    document.getElementById('bestScore').textContent = `Your BEST score: ${bestScore}`;


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
            clearInterval(game);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, arena.width, arena.height)
            ctx.fill();
            result = ball.y <= 0 ? 'WON' : 'LOSE';
            resultInfo.textContent = `You ${result}!!!`;
            if (score > bestScore) localStorage.bestScore = score;
            againBtn.style.display = 'block';
            canvas.style.cursor = 'auto';
        }

        const offset = 1.4 + Math.random();
        if (players.enemyPos > ball.x - 50)
            players.enemyPos -= offset;
        if (players.enemyPos < ball.x - 50)
            players.enemyPos += offset;
        if (players.enemyPos < 0) players.enemyPos = 0;
        if (players.enemyPos > arena.width - 100) players.enemyPos = arena.width - 100;
    };
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
        ctx.fillRect(players.selfPos, 790, 100, 10);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#990000';
        ctx.beginPath();
        ctx.fillRect(players.enemyPos, 0, 100, 10);
        ctx.closePath();
        ctx.fill();
        ballMove();
        scoreInfo.textContent = `SCORE: ${score}`;
    }
    canvas.addEventListener('mousemove', (e) => {
        players.selfPos = e.offsetX - 100 > 0 ? e.offsetX - 100 : 0;
    });

    window.addEventListener('touchstart', (e) => {
            const x = e.touches[0].screenX;
        console.log(window.screen.width);
        console.log(e.touches[0]);
            if (x > (window.screen.width / 2)) {
                players.selfPos+=10;
            } else {
                players.selfPos+=10;
        }
    });


    againBtn.addEventListener('click', ()=>{
        window.location.reload();
    })

    const game = setInterval(renderGame, 10);

})();