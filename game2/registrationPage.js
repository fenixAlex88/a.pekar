export function registrationPage() {
    const regMenu = document.createElement('div');
    app.append(regMenu);
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
    regBtn.onclick = reg;

    const backBtn = document.createElement('input');
    regForm.append(backBtn);
    backBtn.classList.add('input');
    backBtn.type = 'button';
    backBtn.value = 'Назад';
    backBtn.onclick = () => {
        window.history.go(-1)
    };

    async function reg() {
        const username = userNameInput.value;
        const password = passwordInput.value;
        try {
            let response = await fetch('http://127.0.0.1:3000/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({username, password})
            });
            const result = await response.json();
            sessionStorage.auth = result.auth;
            sessionStorage.player = JSON.stringify(result);
            alert(result.message);
        } catch (e) {
            alert(e);
        }

        location.hash = 'main';
    }


    return regMenu;
}