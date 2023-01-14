const canvas = document.getElementById('app');
const context = canvas.getContext('2d');

const box = 32,
    apple = {
        x: Math.floor(Math.random() * 18) * box,
        y: Math.floor(Math.random() * 18) * box
    },
    snake = [{
        x: 9 * box,
        y: 9 * box
    }];
let dir,
    score = 0,
    speed = 300,
    endGame = false;

document.addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 37:
            dir = dir !== 'right' ? 'left' : 'right';
            break;
        case 38:
            dir = dir !== 'down' ? 'up' : 'down';
            break;
        case 39:
            dir = dir !== 'left' ? 'right' : 'left';
            break;
        case 40:
            dir = dir !== 'up' ? 'down' : 'up';
            break;
    }
});

const render = () => {
    context.fillStyle = '#cbcbcb';
    context.fillRect(0, 0, box * 19, box * 19)
    context.fillStyle = '#676767';
    context.fillRect(0, box * 19, box * 19, box * 5)
    context.fillStyle = '#ff1111';
    context.fillRect(apple.x, apple.y, box, box)
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i === 0 ? '#962f2f' : '#ad895a';
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
    context.fillStyle = '#000';
    context.font = '48px sanserif';
    context.fillText(`Score: ${score}`, box * 1, box * 21)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === apple.x && snakeY === apple.y) {
        score++;
        speed *= 0.9;
        apple.x = Math.floor(Math.random() * 18) * box;
        apple.y = Math.floor(Math.random() * 18) * box;
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

    snake.some(e => snakeX === e.x && snakeY === e.y) ? endGame = true
        : snake.unshift({
            x: snakeX,
            y: snakeY
        });

    if (snakeX < 0 || snakeX > box * 18 || snakeY < 0 || snakeY > box * 18)
        endGame = true;
}

function play() {
    render();
    !endGame ? setTimeout(play, speed) : null;
}

play();
