export function registrationPage() {
    const loginMenu = document.createElement('div');
    app.append(loginMenu);
    loginMenu.classList.add('menu');
    const loginForm = document.createElement('form');
    loginMenu.append(loginForm);

    const userNameInfo = document.createElement('label');
    loginForm.append(userNameInfo);
    userNameInfo.textContent = 'Имя игрока:';
    const userNameInput = document.createElement('input');
    loginForm.append(userNameInput);
    userNameInput.classList.add ('input');
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

    const regBtn = document.createElement('input');
    loginForm.append(regBtn);
    regBtn.classList.add('input');
    regBtn.type = 'button';
    regBtn.value = 'Регистрация';

    const backBtn = document.createElement('input');
    loginForm.append(backBtn);
    backBtn.classList.add('input');
    backBtn.type = 'button';
    backBtn.value = 'Назад';
    backBtn.onclick=()=>{window.history.go(-1)};

    return loginMenu;
}