import {game} from './game.js';

export function menu() {
const _menu = document.createElement('div');
app.append(_menu);
_menu.classList.add('menu');
const menuUl = document.createElement('ul');
_menu.append(menuUl);
menuUl.innerHTML = `
<li class="btn"><a href="" class="enterBtn">Войти</a></li>
<li class="btn"><a href="" class="regBtn">Регистрация</a></li>
<li class="btn"><a href="" class="aboutBtn">Лучшие</a></li>
<li class="btn"><a href="" class="aboutBtn">О проектe</a></li>
<li class="btn"><a href="" class="exitBtn">Выход</a></li>
`;

const enterBtn = document.querySelector('.enterBtn');
enterBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    location.hash = 'game'
});
const exitBtn = document.querySelector('.exitBtn');
exitBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    window.close();
});
return _menu;
}