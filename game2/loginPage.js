import {userAPImodule} from "./userAPI.module.js";

export function loginPage() {
    const fragment = document.createDocumentFragment();
    const loginMenu = document.createElement('div');
    fragment.append(loginMenu);
    loginMenu.classList.add('menu');
    const loginForm = document.createElement('form');
    loginMenu.append(loginForm);

    const userNameInfo = document.createElement('label');
    loginForm.append(userNameInfo);
    userNameInfo.textContent = 'Имя игрока:';
    const userNameInput = document.createElement('input');
    loginForm.append(userNameInput);
    userNameInput.classList.add('input');
    userNameInput.type = 'text';
    userNameInput.name = 'user_name';

    const passwordInfo = document.createElement('label');
    loginForm.append(passwordInfo);
    passwordInfo.textContent = 'Пароль:';
    const passwordInput = document.createElement('input');
    loginForm.append(passwordInput);
    passwordInput.classList.add('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';

    loginForm.append(document.createElement('br'));

    const enterBtn = document.createElement('input');
    loginForm.append(enterBtn);
    enterBtn.classList.add('input');
    enterBtn.type = 'button';
    enterBtn.value = 'Войти';
    enterBtn.addEventListener('click', ()=>{userAPImodule.login(userNameInput.value, passwordInput.value)});

    const backBtn = document.createElement('input');
    loginForm.append(backBtn);
    backBtn.classList.add('input');
    backBtn.type = 'button';
    backBtn.value = 'Назад';
    backBtn.onclick = () => {
        window.history.go(-1)
    };

    return fragment;
}