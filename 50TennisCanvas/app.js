const canvas = document.getElementById('app');
const ctx = canvas.getContext('2d');
let y = 250;
let ballx = 200;
let bally = 200;
const game = () => {
    canvas.style.cursor = 'none';
    if (y > 500) y = 500;
    if (y < 0) y = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#eeec7e';
    ctx.fillRect(0, 0, 800, 600)
    ctx.fill();
    ctx.fillStyle = "rgb(238,33,56)";
    ctx.beginPath();
    ctx.arc(250, 250, 20, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#191497';
    ctx.beginPath();
    ctx.fillRect(780, y, 20, 100);
    ctx.closePath();
    ctx.fill();
}

canvas.addEventListener('mousemove', (e) => y = e.clientY - 50);

setInterval(game,30)
