//текущая дата(время)
const time = new Date();
const clockRadius = 200;

//Находим контейнер часов и устанавливаем размеры
const clock = document.getElementById('clock');
clock.style.width = `${clockRadius * 2}px`;
clock.style.height = `${clockRadius * 2}px`;

//рисуем циферблат
const clockBody = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
clock.append(clockBody);
clockBody.setAttribute("fill", "#fcca66");
clockBody.setAttribute("r", clockRadius);
clockBody.setAttribute("cx", clockRadius);
clockBody.setAttribute("cy", clockRadius);
//рисуем цифровые часы
const digitClock = document.createElementNS("http://www.w3.org/2000/svg", 'text');
clock.append(digitClock);
digitClock.setAttribute("x", 200);
digitClock.setAttribute("y", 130);
digitClock.setAttribute("text-anchor", 'middle');
digitClock.style.fill = "#2b2a29";
digitClock.style = "font-size: 36px"
//рисуем часовую стрелку
const hoursArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
clock.append(hoursArrow);
hoursArrow.setAttribute("x1", `${clockRadius}`);
hoursArrow.setAttribute("y1", `${clockRadius + 15}`); //свес стрелки 15
hoursArrow.setAttribute("x2", `${clockRadius}`);
hoursArrow.setAttribute("y2", `${clockRadius + 15 - 75}`); //длина стрелки 75
hoursArrow.style = "stroke-linecap: round; stroke: rgb(5,5,5); stroke-width:12px;";
let hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes());
//рисуем минутную стрелку
const minutesArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
clock.append(minutesArrow);
minutesArrow.setAttribute("x1", `${clockRadius}`);
minutesArrow.setAttribute("y1", `${clockRadius + 15}`); //свес стрелки 15
minutesArrow.setAttribute("x2", `${clockRadius}`);
minutesArrow.setAttribute("y2", `${clockRadius + 15 - 110}`); //длина стрелки 110
minutesArrow.style = "stroke-linecap: round; stroke: rgb(5,5,5); stroke-width:7px;";
let minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds());
//рисуем секундную стрелку
const secondsArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
clock.append(secondsArrow);
secondsArrow.setAttribute("x1", `${clockRadius}`);
secondsArrow.setAttribute("y1", `${clockRadius + 15}`); //свес стрелки 15
secondsArrow.setAttribute("x2", `${clockRadius}`);
secondsArrow.setAttribute("y2", `${clockRadius + 15 - 140}`); //длина стрелки 140
secondsArrow.style = "stroke-linecap: round; stroke: rgb(110, 33, 33); stroke-width:4px;";
let secondsDeg = 6 * time.getSeconds() - 6;

//рисуем часовые отметки
for (let i = 1; i <= 12; i++) {
    const clockNumbers = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    clock.append(clockNumbers);
    const angle = (i * 30) / 180 * Math.PI;
    const clockNumbersCenterX = Math.round(clockRadius + 160 * Math.sin(angle));
    const clockNumbersCenterY = Math.round(clockRadius - 160 * Math.cos(angle));
    clockNumbers.setAttribute("fill", "#48b382");
    clockNumbers.setAttribute("r", 25);
    clockNumbers.setAttribute("cx", clockNumbersCenterX);
    clockNumbers.setAttribute("cy", clockNumbersCenterY);
    const clockNumbersText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    clockNumbersText.textContent = i;
    clock.append(clockNumbersText);
    clockNumbersText.setAttribute("x", clockNumbersCenterX);
    clockNumbersText.setAttribute("y", clockNumbersCenterY + 8);
    clockNumbersText.setAttribute("text-anchor", 'middle');
    clockNumbersText.style.fill = "#2b2a29";
    clockNumbersText.style = "font-size: 32px"
}

//функция запуска часов
const clocksRun = () => {
    //текущая дата(время)
    const time = new Date();
    //настраиваем цифровые часы
    digitClock.textContent = time.toLocaleTimeString();
    //настраиваем секундную стрелку
    secondsArrow.setAttribute('transform', `rotate(${secondsDeg += 6} ${clockRadius} ${clockRadius})`);
    //настраиваем минутную стрелку
    minutesArrow.setAttribute('transform', `rotate(${minutesDeg += 6 / 60} ${clockRadius} ${clockRadius})`);
    //настраиваем часовую стрелку
    hoursArrow.setAttribute('transform', `rotate(${hoursDeg += 6 / 360} ${clockRadius} ${clockRadius})`);
    //перезапуск через 1 секунду
    setTimeout(clocksRun, 1000);
}
//первичная инициализация интервала
clocksRun();

