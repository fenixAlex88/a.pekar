export function loginPage() {
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

    const enterBtn = document.createElement('input');
    loginForm.append(enterBtn);
    enterBtn.classList.add('input');
    enterBtn.type = 'button';
    enterBtn.value = 'Войти';
    enterBtn.onclick = log;

    const backBtn = document.createElement('input');
    loginForm.append(backBtn);
    backBtn.classList.add('input');
    backBtn.type = 'button';
    backBtn.value = 'Назад';
    backBtn.onclick=()=>{window.history.go(-1)};

    async function log() {
        const username = userNameInput.value;
        const password = passwordInput.value;
        try {
            let response = await fetch('http://127.0.0.1:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({username, password})
            });
            const result = await response.json();
            sessionStorage.auth = result.auth;
            sessionStorage.player = JSON.stringify(result);
            console.log(result);
            alert(result.message);
        } catch (e) {
            alert(e);
        }

        location.hash = 'main';
    }

    return loginMenu;
}