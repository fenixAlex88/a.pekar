import {userAPImodule} from "./userAPI.module.js";

export function registrationPage() {
    const fragment = document.createDocumentFragment();
    const regMenu = document.createElement('div');
    fragment.append(regMenu);
    regMenu.classList.add('menu');
    const regForm = document.createElement('form');
    regMenu.append(regForm);


    const userNameInfo = document.createElement('label');
    regForm.append(userNameInfo);
    userNameInfo.textContent = 'Имя игрока:';
    const userNameInput = document.createElement('input');
    regForm.append(userNameInput);
    userNameInput.classList.add('input');
    userNameInput.type = 'text';
    userNameInput.name = 'user_name';

    const passwordInfo = document.createElement('label');
    regForm.append(passwordInfo);
    passwordInfo.textContent = 'Пароль:';
    const passwordInput = document.createElement('input');
    regForm.append(passwordInput);
    passwordInput.classList.add('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';

    regForm.append(document.createElement('br'));

    const regBtn = document.createElement('input');
    regForm.append(regBtn);
    regBtn.classList.add('input');
    regBtn.type = 'button';
    regBtn.value = 'Регистрация';
    regBtn.onclick=('click', ()=>{userAPImodule.reg(userNameInput.value, passwordInput.value)});

    const backBtn = document.createElement('input');
    regForm.append(backBtn);
    backBtn.classList.add('input');
    backBtn.type = 'button';
    backBtn.value = 'Назад';
    backBtn.onclick = () => {
        window.history.go(-1)
    };

    return fragment;
}