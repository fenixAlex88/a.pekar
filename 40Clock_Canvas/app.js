const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');
let radius = canvas.width / 2;

function clocksRun() {
    //Очистка канваса
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //рисуем циферблат
    ctx.fillStyle = '#0c0c0d';
    ctx.beginPath();
    ctx.arc(200, 200, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.font = 'bold 38px Arial';
    ctx.textAlign = 'center';

    const time = new Date();
    //Рисуем цифровые часы
    ctx.fillStyle = '#06b6ed';
    ctx.fillText(time.toLocaleTimeString(), 200, 150)

    //рисуем часовые отметки
    for (let i = 1; i <= 12; i++) {

        ctx.fillStyle = '#181917';
        ctx.beginPath();
        const angle = (i * 30) / 180 * Math.PI;
        const clockNumbersCenterX = Math.round(radius + 160 * Math.sin(angle));
        const clockNumbersCenterY = Math.round(radius - 160 * Math.cos(angle));
        ctx.arc(clockNumbersCenterX, clockNumbersCenterY, 25, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.font = '32px Arial';
        ctx.fillStyle = '#f9f9fa';
        ctx.fillText(i, clockNumbersCenterX, clockNumbersCenterY + 10)

    }

    //Рисуем часы
    const hoursDeg = (30 * (time.getHours() + (1 / 60) * time.getMinutes())) * (Math.PI / 180);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(hoursDeg);
    ctx.translate(-radius, -radius);
    ctx.strokeStyle = "#b2f98c";
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.moveTo(200, 215);
    ctx.lineTo(200, 145);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    //Рисуем минуты
    const minutesDeg = (6 * (time.getMinutes() + (1 / 60) * time.getSeconds())) * (Math.PI / 180);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(minutesDeg);
    ctx.translate(-radius, -radius);
    ctx.beginPath();
    ctx.strokeStyle = "#b2f98c";
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.moveTo(200, 215);
    ctx.lineTo(200, 110);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    //Рисуем секунды
    const secondsDeg = 6 * time.getSeconds() * Math.PI / 180;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(secondsDeg);
    ctx.translate(-radius, -radius);
    ctx.beginPath();
    ctx.strokeStyle = "rgb(250,146,52)";
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.moveTo(200, 215);
    ctx.lineTo(200, 80);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.fillStyle = "rgb(250,146,52)";
    ctx.beginPath();
    ctx.arc(radius, radius, 7, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    //перезапускаем таймаут
    setTimeout(clocksRun, 1000);
}

//первичная инициализация интервала
clocksRun();