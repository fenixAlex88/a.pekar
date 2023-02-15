export function aboutPage(){
    const about = document.createElement('div');
    app.append(about);
    const aboutHeader = document.createElement('h1');
    about.append(aboutHeader);
    aboutHeader.textContent = 'О проектe';

    const backBtn = document.createElement('a');
    about.append(backBtn);
    backBtn.classList.add('input');
    backBtn.style.float = 'right';
    backBtn.textContent = 'Назад';
    backBtn.classList.add('btn');
    backBtn.onclick = () => {
        window.history.go(-1)
    };

    const aboutText = document.createElement('div');
    about.append(aboutText);
    aboutText.classList.add('aboutText', 'a-pos');
    const aboutTextContent = document.createElement('p');
    aboutText.append(aboutTextContent);
    aboutTextContent.textContent=`
            WebDesignMagazine.ru – это сайт, который является ведущим в Рунете онлайн сообществом для веб-дизайнеров и
            разработчиков. Мы публикуем новости веб-дизайна, интересные уроки и обзоры, современные тенденции дизайна,
            тем
            самым представляя возможность нашим читателям обмениваться опытом и знаниями, советами и подсказками. Только
            здесь вы найдете подробные обучающие статьи по Вордпрессу, HTML5, CSS, jQuery, узнаете секреты современного
            веб-дизайна.

            За несколько месяцев работы число наших читателей и колличество участников социальных сетей достигло более
            6000
            человек! И это только начало!

            Мы публикуем только то, что интересно читателям и относится к веб-дизайну. Если у вас есть какие-либо
            вопросы,
            предложения по работе и развитию сайта, вы хотите провести конкурс или разыграть что-либо – напишите нам
            пару
            строк! Мы будем рады Вас слышать!
    `;

return about;
}