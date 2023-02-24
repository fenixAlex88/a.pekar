export function aboutPage() {
    const fragment = document.createDocumentFragment();
    app.append(fragment);
    const aboutHeader = document.createElement('h1');
    fragment.append(aboutHeader);
    aboutHeader.textContent = 'О проектe';

    const backBtn = document.createElement('a');
    fragment.append(backBtn);
    backBtn.classList.add('input');
    backBtn.style.float = 'right';
    backBtn.textContent = 'Назад';
    backBtn.classList.add('btn');
    backBtn.onclick = () => {
        window.history.go(-1)
    };

    const aboutText = document.createElement('div');
    fragment.append(aboutText);
    aboutText.classList.add('aboutText', 'a-pos');
    const aboutTextContent = document.createElement('p');
    aboutText.append(aboutTextContent);
    aboutTextContent.innerHTML = 'Давным-давнo,<br> ' +
        'в далекой-далекой галактике <br>' +
        'была разработана игра... <br><br>' +
        'Данная игра разработана в рамках выпускного проекта по курсу "Разработка веб-приложений на JavaScript"<br><br>' +
        'Игра создана с использованием JavaScript-фреймворкa Babylon.js, <br>' +
        'использующего API WebGL для отображения 2D и 3D-графики в браузере.<br><br>' +
        'В игре использованы 3D модели:<br>' +
        '"Xwing" by GaryPhelps licensed under CC-BY-4.0<br>' +
        '"Star Wars: TIE Fighter" by Daniel licensed under CC-BY-4.0<br><br>' +
        '&copy 2023 Alexey Pekar';

    return fragment;
}