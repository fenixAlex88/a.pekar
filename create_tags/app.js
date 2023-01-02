document.getElementById('addH').addEventListener('click', () => {
    const select = document.createElement('select');
    for (let i = 1; i <= 6; i++) {
        const option = document.createElement('option');
        option.value = `H${i}`;
        option.textContent = `H${i}`;
        select.appendChild(option);
    }
    const text = document.createElement('input');
    text.type = 'text';
    const btn = document.createElement('input');
    btn.type = 'button';
    btn.value = 'Добавить';
    document.getElementById('prop').appendChild(select);
    document.getElementById('prop').appendChild(text);
    document.getElementById('prop').appendChild(btn);
});

document.getElementById('prop').addEventListener("click", e=>{
    if(e.target.type === 'button') {
        const tag = document.createElement(document.querySelector('select').value);
        tag.textContent = document.querySelector('input').value;
        document.getElementById('content').appendChild(tag);
    }
});
//document.getElementById('addP').addEventListener('click', addP);
//document.getElementById('addUl').addEventListener('click', addUl);