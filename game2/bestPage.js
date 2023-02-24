import {userAPImodule} from "./userAPI.module.js";

export function bestPage() {

    const fragment = document.createDocumentFragment();
    const bestPageHeader = document.createElement('h1');
    fragment.append(bestPageHeader);
    bestPageHeader.textContent = 'Лучшие игроки';
    const bestPageTable = document.createElement('table');
    fragment.append(bestPageTable);
    const tr = document.createElement('tr');
    bestPageTable.append(tr);
    const placeTh = document.createElement('th');
    tr.append(placeTh);
    placeTh.style.width = '5vw';
    placeTh.textContent = 'Место';
    const nameTh = document.createElement('th');
    tr.append(nameTh);
    nameTh.textContent = 'Имя';
    const scoreTh = document.createElement('th');
    tr.append(scoreTh);
    scoreTh.style.width = '10vw';
    scoreTh.textContent = 'Результат';
    //Отрисовка таблицы результатов
    userAPImodule.getBests(renderTable);

    function renderTable(res) {
        res.forEach((player, i) => {
            const tr = document.createElement('tr');
            bestPageTable.append(tr);
            const placeTd = document.createElement('td');
            tr.append(placeTd);
            placeTd.textContent = i + 1;
            const nameTd = document.createElement('td');
            tr.append(nameTd);
            nameTd.textContent = player.username;
            const scoreTd = document.createElement('td');
            tr.append(scoreTd);
            scoreTd.textContent = player.score;
        })
    }

//Кнопка НАЗАД
    const backBtn = document.createElement('a');
    fragment.append(backBtn);
    backBtn.classList.add('input');
    backBtn.style.float = 'right';
    backBtn.textContent = 'Назад';
    backBtn.classList.add('btn');
    backBtn.onclick = () => {
        window.history.go(-1)
    };

    return fragment;
}