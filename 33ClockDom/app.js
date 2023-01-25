//Находим контейнер часов и координаты его центра
const clock = document.getElementById('clock');
const clockCenterX = clock.offsetLeft + clock.offsetWidth / 2;
const clockCenterY = clock.offsetTop + clock.offsetHeight / 2;

//текущая дата(время)
const time = new Date();

//создаем цифровые часы и позиционируем
const digitalClock = document.createElement("div");
clock.append(digitalClock);
digitalClock.classList.add("digitalClock");
digitalClock.style.left = clockCenterX - digitalClock.offsetWidth / 2 + "px";
digitalClock.style.top = clockCenterY - 70 + "px";

//создаем часовую стрелку и позиционируем
const hoursArrow = document.createElement("div");
clock.append(hoursArrow);
hoursArrow.classList.add("hoursArrow");
hoursArrow.style.top = clockCenterX - hoursArrow.offsetHeight + 15 + "px";
hoursArrow.style.left = clockCenterX - hoursArrow.offsetWidth / 2 + "px";
hoursArrow.style.transformOrigin = `center ${hoursArrow.offsetHeight - 15}px`;
let hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes());

//создаем минутную стрелку и позиционируем
const minutesArrow = document.createElement("div");
clock.append(minutesArrow);
minutesArrow.classList.add("minutesArrow");
minutesArrow.style.top = clockCenterX - minutesArrow.offsetHeight + 15 + "px";
minutesArrow.style.left = clockCenterX - minutesArrow.offsetWidth / 2 + "px";
minutesArrow.style.transformOrigin = `center ${minutesArrow.offsetHeight - 15}px`;
let minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds());

//создаем секундную стрелку и позиционируем
const secondsArrow = document.createElement("div");
clock.append(secondsArrow);
secondsArrow.classList.add("secondsArrow");
secondsArrow.style.top = clockCenterX - secondsArrow.offsetHeight + 15 + "px";
secondsArrow.style.left = clockCenterX - secondsArrow.offsetWidth / 2 + "px";
secondsArrow.style.transformOrigin = `center ${secondsArrow.offsetHeight - 15}px`;
let secondsDeg = 6 * time.getSeconds() - 6;

//создаем часовые отметки
for (let i = 1; i <= 12; i++) {
    const clockNumbers = document.createElement("div");
    clock.append(clockNumbers);
    clockNumbers.classList.add('clock__numbers');
    clockNumbers.textContent = i;
    const angle = (i * 30) / 180 * Math.PI;
    const clockNumbersCenterX = clockCenterX + 160 * Math.sin(angle);
    const clockNumbersCenterY = clockCenterY - 160 * Math.cos(angle);
    clockNumbers.style.left = Math.round(clockNumbersCenterX - clockNumbers.offsetWidth / 2) + "px";
    clockNumbers.style.top = Math.round(clockNumbersCenterY - clockNumbers.offsetHeight / 2) + "px";
}

//функция запуска часов
const clocksRun = () => {
    //текущая дата(время)
    const time = new Date();
    //настраиваем цифровые часы
    digitalClock.textContent = time.toLocaleTimeString();
    //настраиваем секундную стрелку
    secondsArrow.style.transform = `rotate(${secondsDeg += 6}deg)`;
    //настраиваем минутную стрелку
    minutesArrow.style.transform = `rotate(${minutesDeg += 6 / 60}deg)`;
    //настраиваем часовую стрелку
    hoursArrow.style.transform = `rotate(${hoursDeg += 6 / 360}deg)`;
    //перезапуск через 1 секунду
    setTimeout(clocksRun, 1000);
}
//первичная инициализация интервала
clocksRun();

