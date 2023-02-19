export function bestPage() {

    const bestPage = document.createElement('div');
    const bestPageHeader = document.createElement('h1');
    bestPage.append(bestPageHeader);
    bestPageHeader.textContent = 'Лучшие игроки';
    const bestPageTable = document.createElement('table');
    bestPage.append(bestPageTable);
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

    getBests().then((bestPlayers)=>{
        bestPlayers.forEach((player, i)=>{
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
    });

    const backBtn = document.createElement('a');
    bestPage.append(backBtn);
    backBtn.classList.add('input');
    backBtn.style.float = 'right';
    backBtn.textContent = 'Назад';
    backBtn.classList.add('btn');
    backBtn.onclick = () => {
        window.history.go(-1)
    };

    async function getBests() {
        try {
            let response = await fetch('http://127.0.0.1:3000/auth/users', {
                method: 'GET'
            });
            const result = await response.json();
            return result;
        } catch (e) {
            alert(e);
        }
    }

    return bestPage;
}