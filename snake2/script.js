const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const box = 32;
let score = 0;
const food = {
    x: Math.floor(Math.random() * 18) * box,
    y: Math.floor(Math.random() * 18) * box
};
const snake = [{
    x: 9 * box,
    y: 9 * box
}];
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

const drawGame = () => {
    context.fillStyle = '#cbcbcb';
    context.fillRect(0, 0, box * 19, box * 19)
    context.fillStyle = '#676767';
    context.fillRect(0, box*19, box * 19, box * 5)
    context.fillStyle = '#ff1111';
    context.fillRect(food.x, food.y, box, box)
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i === 0 ? '#962f2f' : '#ad895a';
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
    context.fillStyle = '#000';
    context.font = '50px Arial';
    context.fillText(`Score: ${score}`, box * 1, box * 21)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food.x = Math.floor(Math.random() * 18) * box;
        food.y = Math.floor(Math.random() * 18) * box;
    } else {
        snake.pop();
    }

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

    snake.some(e => snakeX === e.x && snakeY === e.y) ? clearInterval(game)
        : snake.unshift({
            x: snakeX,
            y: snakeY
        });

    if (snakeX < 0 || snakeX > box * 18 || snakeY < 0 || snakeY > box * 18)
        clearInterval(game);
}
const game = setInterval(drawGame, 125);