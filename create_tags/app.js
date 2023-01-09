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
    btn.dataset.type = 'H';
    document.getElementById('prop').appendChild(select);
    document.getElementById('prop').appendChild(text);
    document.getElementById('prop').appendChild(btn);
});

document.getElementById('addP').addEventListener('click', () => {
    const text = document.createElement('input');
    text.type = 'text';
    const btn = document.createElement('input');
    btn.type = 'button';
    btn.value = 'Добавить';
    btn.dataset.type = 'p';
    document.getElementById('prop').appendChild(text);
    document.getElementById('prop').appendChild(btn);
});
document.getElementById('addUl').addEventListener('click', () => {
    const text = document.createElement('input');
    text.type = 'text';
    const btn = document.createElement('input');
    btn.type = 'button';
    btn.value = 'Добавить';
    btn.dataset.type = 'ul';
    document.getElementById('prop').appendChild(text);
    document.getElementById('prop').appendChild(btn);
});

document.getElementById('prop').addEventListener("click", e => {
        if (e.target.dataset.type === 'H') {
            const tag = document.createElement(document.querySelector('select').value);
            tag.textContent = document.querySelector('input').value;
            document.getElementById('content').appendChild(tag);
            e.currentTarget.innerHTML = '';
        } else if (e.target.dataset.type === 'p') {
            const tag = document.createElement('p');
            tag.textContent = document.querySelector('input').value;
            document.getElementById('content').appendChild(tag);
            e.currentTarget.innerHTML = '';
        }


});
