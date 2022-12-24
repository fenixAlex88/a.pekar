const sq = document.getElementById('square');


window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 87:
            if (sq.offsetTop>0)
            sq.style.top = `${sq.offsetTop - 10}px`;
            console.log('up');
            break;
        case 68:
            if (sq.offsetLeft<250)
            sq.style.left = `${sq.offsetLeft + 10}px`;
            console.log('right');
            break;
        case 83:
            if (sq.offsetTop<250)
            sq.style.top = `${sq.offsetTop + 10}px`;
            console.log('down');
            break;
        case 65:
            if (sq.offsetLeft>0)
            sq.style.left = `${sq.offsetLeft - 10}px`;
            console.log('left');
            break;
    }
})




























//square.style.left = `${parseInt(square.style.left + 10)}px`;