export function menuPage() {

        const _menu = document.createElement('div');
        app.append(_menu);
        _menu.classList.add('menu');
        const menuUl = document.createElement('ul');
        _menu.append(menuUl);
    if (sessionStorage.player) {
        const gameBtnLi = document.createElement('li');
        menuUl.append(gameBtnLi);
        gameBtnLi.classList.add('btn');
        const gameBtnLink = document.createElement('a');
        gameBtnLi.append(gameBtnLink);
        gameBtnLink.classList.add('gameBtn');
        gameBtnLink.textContent = 'В БОЙ!!!';
        gameBtnLink.onclick = () => {
            location.hash = 'game'
        };
    } else {

        const enterBtnLi = document.createElement('li');
        menuUl.append(enterBtnLi);
        enterBtnLi.classList.add('btn');
        const enterBtnLink = document.createElement('a');
        enterBtnLi.append(enterBtnLink);
        enterBtnLink.classList.add('enterBtn');
        enterBtnLink.textContent = 'Войти';
        enterBtnLink.onclick = () => {
            location.hash = 'login'
        };

        const regBtnLi = document.createElement('li');
        menuUl.append(regBtnLi);
        regBtnLi.classList.add('btn');
        const regBtnLink = document.createElement('a');
        regBtnLi.append(regBtnLink);
        regBtnLink.classList.add('regBtn');
        regBtnLink.textContent = 'Регистрация';
        regBtnLink.onclick = () => {
            location.hash = 'registration'
        };
    }
    const aboutBtnLi = document.createElement('li');
    menuUl.append(aboutBtnLi);
    aboutBtnLi.classList.add('btn');
    const aboutBtnLink = document.createElement('a');
    aboutBtnLi.append(aboutBtnLink);
    aboutBtnLink.classList.add('aboutBtn');
    aboutBtnLink.textContent = 'О проектe';
    aboutBtnLink.onclick = () => {
        location.hash = 'about'
    }

    const bestBtnLi = document.createElement('li');
    menuUl.append(bestBtnLi);
    bestBtnLi.classList.add('btn');
    const bestBtnLink = document.createElement('a');
    bestBtnLi.append(bestBtnLink);
    bestBtnLink.classList.add('bestBtn');
    bestBtnLink.textContent = 'Лучшие';
    bestBtnLink.onclick = () => {
        location.hash = 'best'
    }

    const exitBtnLi = document.createElement('li');
    menuUl.append(exitBtnLi);
    exitBtnLi.classList.add('btn');
    const exitBtnLink = document.createElement('a');
    exitBtnLi.append(exitBtnLink);
    exitBtnLink.classList.add('exitBtn');
    exitBtnLink.textContent = 'Выход';
    exitBtnLink.onclick = () => {
        location.hash = 'exit'
    };

    return _menu;
}