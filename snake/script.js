const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const battlefield = new Image();
battlefield.src = 'img/battlefield.png';

const foodImg = new Image();
foodImg.src = 'img/apple.png';

const box = 32;
let score = 0;
const food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};
const snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
let dir;

document.addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 37:
            if (dir !== 'right')
                dir = 'left';
            break;
        case 38:
            if (dir !== 'down')
                dir = 'up';
            break;
        case 39:
            if (dir !== 'left')
                dir = 'right';
            break;
        case 40:
            if (dir !== 'up')
                dir = 'down';
            break;
    }
});
const gameOver = () => {
    clearInterval(game);
    alert(`                             GAME OVER!!!
                ___________________________________
                             your score ${score}
                ___________________________________
                          press F5 for replay`)
}

const eatTail = (head, snake) => {
    snake.forEach(e => {
        if (head.x === e.x && head.y === e.y) gameOver();
    })
}


const drawGame = () => {
    context.drawImage(battlefield, 0, 0);
    context.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i === 0 ? 'orange' : 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
    context.fillStyle = 'white';
    context.font = '50px Arial';
    context.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food.x = Math.floor(Math.random() * 17 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 3) * box;
    } else {
        snake.pop();
    }
    ;

    if (snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        gameOver();

    switch (dir) {
        case 'left':
            snakeX -= box;
            break;
        case 'right':
            snakeX += box;
            break;
        case 'up':
            snakeY -= box;
            break;
        case 'down':
            snakeY += box;
            break;
    }

    eatTail({x: snakeX, y: snakeY}, snake);
    snake.unshift({
        x: snakeX,
        y: snakeY
    });
}

const game = setInterval(drawGame, 125);