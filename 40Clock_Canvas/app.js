const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');
let radius = canvas.width / 2;

function clocksRun() {
    //Очистка канваса
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //рисуем циферблат
    ctx.fillStyle = '#fcca66';
    ctx.beginPath();
    ctx.arc(200, 200, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.font = '36px sanserif';
    ctx.textAlign = 'center';

    const time = new Date();
    //Рисуем цифровые часы
    ctx.fillStyle = '#000';
    ctx.fillText(time.toLocaleTimeString(), 200, 150)

    //рисуем часовые отметки
    for (let i = 1; i <= 12; i++) {

        ctx.fillStyle = '#48b382';
        ctx.beginPath();
        const angle = (i * 30) / 180 * Math.PI;
        const clockNumbersCenterX = Math.round(radius + 160 * Math.sin(angle));
        const clockNumbersCenterY = Math.round(radius - 160 * Math.cos(angle));
        ctx.arc(clockNumbersCenterX, clockNumbersCenterY, 25, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.fillText(i, clockNumbersCenterX, clockNumbersCenterY + 8)

    }

    //Рисуем секунды
    const secondsDeg = 6 * time.getSeconds() - 6;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(110, 33, 33)";
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.moveTo(radius - 15 * Math.cos(Math.PI / 2 - secondsDeg * (Math.PI / 180)),
        radius + 15 * Math.sin(Math.PI / 2 - secondsDeg * (Math.PI / 180)));
    ctx.lineTo(radius + 130 * Math.cos(Math.PI / 2 - secondsDeg * (Math.PI / 180)),
        radius - 130 * Math.sin(Math.PI / 2 - secondsDeg * (Math.PI / 180)));
    ctx.stroke();
    ctx.closePath();

    //Рисуем минуты
    const minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds());
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.moveTo(radius - 15 * Math.cos(Math.PI / 2 - minutesDeg * (Math.PI / 180)),
        radius + 15 * Math.sin(Math.PI / 2 - minutesDeg * (Math.PI / 180)));
    ctx.lineTo(radius + 100 * Math.cos(Math.PI / 2 - minutesDeg * (Math.PI / 180)),
        radius - 100 * Math.sin(Math.PI / 2 - minutesDeg * (Math.PI / 180)));
    ctx.stroke();
    ctx.closePath();

    //Рисуем часы
    const hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes());
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.moveTo(radius - 15 * Math.cos(Math.PI / 2 - hoursDeg * (Math.PI / 180)),
        radius + 15 * Math.sin(Math.PI / 2 - hoursDeg * (Math.PI / 180)));
    ctx.lineTo(radius + 75 * Math.cos(Math.PI / 2 - hoursDeg * (Math.PI / 180)),
        radius - 75 * Math.sin(Math.PI / 2 - hoursDeg * (Math.PI / 180)));
    ctx.stroke();
    ctx.closePath();
    //перезапускаем таймаут
    setTimeout(clocksRun, 1000);
}

//первичная инициализация интервала
clocksRun();